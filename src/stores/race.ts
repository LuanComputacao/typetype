import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

// Configuration constant for typing text
const DEFAULT_TYPING_TEXT = 'The quick brown fox jumps over the lazy dog. This is a sample text for typing practice. Type this text as fast and accurately as possible to improve your typing speed.'

export interface RaceState {
  loading: boolean
  started: boolean
  completed: boolean
  startedAt: number
  lastWordStartedAt: number
}

export interface RacerStats {
  name: string
  username: string
  progress: number
  wpm: number
  partialWPM: number
  wpmHistory: number[]
  wordsTyped: number
}

export interface TypingData {
  text: string
  typed: string
  currentWord: string
  currentWordTyped: string
  inputLocked: boolean
}

const AVERAGE_CHARS_PER_WORD = 5;

export const useRaceStore = defineStore('race', () => {
  // State
  const race = ref<RaceState>({
    loading: false,
    started: false,
    completed: false,
    startedAt: 0,
    lastWordStartedAt: 0
  })

  const racer = ref<RacerStats>({
    name: 'Me',
    username: 'me',
    progress: 0,
    wpm: 0,
    partialWPM: 0,
    wpmHistory: [],
    wordsTyped: 0
  })

  const typing = ref<TypingData>({
    text: DEFAULT_TYPING_TEXT,
    typed: '',
    currentWord: '',
    currentWordTyped: '',
    inputLocked: true
  })

  const semaphore = ref({
    counter: 0,
    countdown: 3,
    countdownRunning: false
  })

  // Internal state for calculations
  const lastCompletedWordLength = ref(0)

  // Computed
  const carPosition = computed(() => racer.value.progress)

  const carSpeed = computed(() => racer.value.wpm)

  const isTypingDone = computed(() => {
    return typing.value.text === typing.value.typed
  })

  const formattedTime = computed(() => {
    if (!race.value.startedAt) return '0:00'
    const elapsed = Math.floor((Date.now() - race.value.startedAt) / 1000)
    const minutes = Math.floor(elapsed / 60)
    const seconds = elapsed % 60
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  })

  const performanceLevel = computed(() => {
    const wpm = racer.value.wpm
    if (wpm >= 60) return { level: '🚀 Excepcional', color: 'text-purple-600' }
    if (wpm >= 40) return { level: '⭐ Excelente', color: 'text-blue-600' }
    if (wpm >= 25) return { level: '✅ Bom', color: 'text-green-600' }
    if (wpm >= 15) return { level: '📈 Regular', color: 'text-yellow-600' }
    return { level: '🎯 Iniciante', color: 'text-gray-600' }
  })

  // Actions
  const initializeRace = () => {
    // Reset all state
    race.value = {
      loading: false,
      started: false,
      completed: false,
      startedAt: 0,
      lastWordStartedAt: 0
    }

    racer.value = {
      name: 'Me',
      username: 'me',
      progress: 0,
      wpm: 0,
      partialWPM: 0,
      wpmHistory: [],
      wordsTyped: 0
    }

    typing.value.typed = ''
    typing.value.currentWord = getNextWord()
    typing.value.currentWordTyped = ''
    typing.value.inputLocked = true

    semaphore.value = {
      counter: 0,
      countdown: 3,
      countdownRunning: false
    }
  }

  const startCountdown = () => {
    if (semaphore.value.countdownRunning) return

    semaphore.value.countdownRunning = true
    semaphore.value.countdown = 3

    const countdownInterval = setInterval(() => {
      semaphore.value.countdown--
      semaphore.value.counter = (semaphore.value.counter + 1) % 6

      if (semaphore.value.countdown <= 0) {
        clearInterval(countdownInterval)
        startRace()
      }
    }, 1000)
  }

  const startRace = () => {
    race.value.started = true
    race.value.startedAt = Date.now()
    race.value.lastWordStartedAt = Date.now()

    semaphore.value.countdownRunning = false
    semaphore.value.counter = 5 // Green light

    typing.value.inputLocked = false
    typing.value.currentWord = getNextWord()
  }

  const getNextWord = (): string => {
    const tail = typing.value.text.slice(typing.value.typed.length)
    const wordRegex = /[^ ]* ?/
    const match = wordRegex.exec(tail)
    return match ? match[0] : ''
  }

  const updateTyping = (input: string) => {
    if (typing.value.inputLocked || race.value.completed) return

    const isWordComplete = input === typing.value.currentWord

    if (isWordComplete) {
      // Word completed correctly
      typing.value.typed += typing.value.currentWord

      // Store the length of the completed word for partial WPM calculation
      lastCompletedWordLength.value = typing.value.currentWord.trim().length

      typing.value.currentWord = getNextWord()
      typing.value.currentWordTyped = ''

      // Update stats
      racer.value.wordsTyped++
      updateProgress()
      updateVelocity()

      race.value.lastWordStartedAt = Date.now()

      // Check if race is complete
      if (isTypingDone.value) {
        completeRace()
      }
    } else {
      // Update current word being typed
      typing.value.currentWordTyped = input
    }
  }

  const updateProgress = () => {
    racer.value.progress = (typing.value.typed.length * 100) / typing.value.text.length
  }

  const updateVelocity = () => {
    if (!race.value.startedAt) return

    const currentTime = Date.now()

    // Calculate overall WPM
    const totalTimeSeconds = (currentTime - race.value.startedAt) / 1000
    const totalWPM = totalTimeSeconds > 0 ?
      ((typing.value.typed.length - 1) / totalTimeSeconds) * 60 * (1 / AVERAGE_CHARS_PER_WORD) : 0

    // Calculate partial WPM (last word)
    const lastWordTimeSeconds = (currentTime - race.value.lastWordStartedAt) / 1000
    const partialWPM = lastWordTimeSeconds > 0 ?
      (lastCompletedWordLength.value / lastWordTimeSeconds) * 60 * (1 / AVERAGE_CHARS_PER_WORD) : 0

    racer.value.wpm = Math.max(0, totalWPM)
    racer.value.partialWPM = Math.max(0, partialWPM)
    racer.value.wpmHistory.push(racer.value.partialWPM)
  }

  const completeRace = () => {
    race.value.completed = true
    typing.value.inputLocked = true

    // Final velocity calculation
    updateVelocity()
  }

  const resetRace = () => {
    initializeRace()
  }

  // Initialize on store creation
  initializeRace()

  return {
    // State
    race,
    racer,
    typing,
    semaphore,

    // Computed
    carPosition,
    carSpeed,
    isTypingDone,
    formattedTime,
    performanceLevel,

    // Actions
    initializeRace,
    startCountdown,
    updateTyping,
    resetRace
  }
})

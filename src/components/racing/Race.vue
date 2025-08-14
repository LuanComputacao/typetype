<template>
    <div class="race-container">
        <!-- Loading State -->
        <div v-if="racing.loading" class="run__loading-flag">
            <div>Loading text</div>
        </div>

        <!-- Pre-Race State with Semaphore -->
        <div v-else-if="!racing.started" class="pre-race">
            <div class="semaphore-container">
                <SemaphoreLights :counter="semaphoreCounter" :max-counter="5" />
            </div>
            <div class="countdown">
                <button @click="startCountdown" class="start-btn" :disabled="countdownRunning">
                    {{ countdownRunning ? `Iniciando em ${timer}s` : 'Iniciar Corrida' }}
                </button>
            </div>
        </div>

        <!-- Race State -->
        <div v-else class="race-active">
            <!-- Speedometer -->
            <div class="speedometer-container">
                <SpeedometerDigital :velocity="currentWPM" :velocity-last-word="currentPartialWPM" />
            </div>

            <!-- Race Track with Car -->
            <div class="racetrack-container">
                <RaceTrack
                    :lanes="1"
                    track-height="120px"
                    :cars="[{
                        variant: 1,
                        position: carPosition,
                        lane: 1,
                        speed: currentWPM,
                        direction: 'right',
                        size: 'medium',
                        color: 'blue'
                    }]"
                />
            </div>
        </div>

        <!-- Text Display and Input -->
        <div class="typing-section">
            <QuoteBox
                :text="quoteText"
                :typed="typed"
                :current-word="currentWord"
                :current-word-typed="currentWordTyping"
            />
            <TypeBox
                v-if="!typingDone"
                :lock="inputLock"
                :word="currentWordTyping"
                @input="updateRacing"
                @update="updateRacing"
            />
            <div v-else class="race-completed">
                <h2 class="text-2xl font-bold text-green-600">🎉 Corrida Finalizada!</h2>
                <p class="text-lg">Velocidade final: {{ Math.round(me.wpm || 0) }} WPM</p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import QuoteBox from '@/components/typing/QuoteBox.vue'
import TypeBox from '@/components/typing/TypeBox.vue'
import SemaphoreLights from '@/components/transit/SemaphoreLights.vue'
import SpeedometerDigital from '@/components/driver/SpeedometerDigital.vue'
import RaceTrack from '@/components/transit/RaceTrack.vue'
// import RacingTracker from '@/components/RacingTracker.vue'
// import CountDown from '@/components/for-racing/CountDown.vue'

interface Racer {
  name: string
  username: string
  progress: number
  wpm?: number
  wpmHistory?: number[]
}

interface Racing {
  loading: boolean
  started: boolean
  startedAt: number
  lastWordStartedAt: number
}

type EmitFunctions = {
  updateRacing: [racer: Racer]
}

const emit = defineEmits<EmitFunctions>()

// Reactive data
const currentWord = ref('')
const currentWordTyping = ref('')
const inputLock = ref(true)
const timer = ref(3)
const typed = ref('')
const quoteText = ref('The quick brown fox jumps over the lazy dog. This is a sample text for typing practice.')
const wordsTyped = ref(0)
const lastWordTyped = ref('')

// New reactive data for components
const semaphoreCounter = ref(0)
const countdownRunning = ref(false)
const currentWPM = ref(0)
const currentPartialWPM = ref(0)

// Countdown interval
let countdownInterval: ReturnType<typeof setInterval> | null = null
let semaphoreInterval: ReturnType<typeof setInterval> | null = null

const wordRegex = /[^ ]* ?/

const me = ref<Racer>({
  name: 'Me',
  username: 'me',
  progress: 0,
  wpm: 0,
  wpmHistory: []
})

const racing = ref<Racing>({
  loading: false, // Changed to false since we don't have the store
  started: false,
  startedAt: 0,
  lastWordStartedAt: 0
})

// Computed
const typingDone = computed(() => {
  return quoteText.value === typed.value
})

const carPosition = computed(() => {
  return me.value.progress
})

// Methods
const calculateProgress = () => {
  me.value.progress = (typed.value.length * 100) / quoteText.value.length
}

const incrementTypedWord = () => {
  wordsTyped.value += 1
}

const getNextWord = () => {
  const tail = quoteText.value.slice(typed.value.length)
  const match = tail.match(wordRegex)
  return match ? match[0] : ''
}

const getPartialWPM = () => {
  return ((lastWordTyped.value.length - 1) / (timeDeltaSec(Date.now(), racing.value.lastWordStartedAt))) * 60 * (1 / 5)
}

const getWPM = () => {
  return ((typed.value.length - 1) / (timeDeltaSec(Date.now(), racing.value.startedAt))) * 60 * (1 / 5)
}

const registerCurrentVelocity = () => {
  const wpm = getWPM()
  const partialWPM = getPartialWPM()

  me.value.wpm = wpm
  me.value.wpmHistory?.push(partialWPM)

  // Update reactive values for components
  currentWPM.value = wpm
  currentPartialWPM.value = partialWPM
}

const startCountdown = () => {
  if (countdownRunning.value) return

  countdownRunning.value = true
  timer.value = 3

  // Start semaphore animation
  semaphoreInterval = setInterval(() => {
    semaphoreCounter.value = (semaphoreCounter.value + 1) % 6
  }, 500)

  // Start countdown
  countdownInterval = setInterval(() => {
    timer.value--
    if (timer.value <= 0) {
      clearInterval(countdownInterval!)
      clearInterval(semaphoreInterval!)
      startRacing()
    }
  }, 1000)
}

const startRacing = () => {
  racing.value.started = true
  countdownRunning.value = false
  semaphoreCounter.value = 5 // Green light
  startTimer()
  startTyping()
}

const startTimer = () => {
  const now = Date.now()
  racing.value.startedAt = now
  racing.value.lastWordStartedAt = now
}

const startTyping = () => {
  currentWord.value = getNextWord()
  inputLock.value = false
}

const timeDeltaSec = (after: number, before: number) => {
  return (after - before) / 1000
}

const updateCurrentWord = (e: string) => {
  if (e === currentWord.value) {
    typed.value += currentWord.value
    lastWordTyped.value = currentWord.value
    currentWord.value = getNextWord()
    currentWordTyping.value = ''
    return true
  } else {
    currentWordTyping.value = e
    return false
  }
}

const updateRacing = (e: string) => {
  const isNewWord = updateCurrentWord(e)
  if (isNewWord) {
    incrementTypedWord()
    registerCurrentVelocity()
    calculateProgress()
    racing.value.lastWordStartedAt = Date.now()
    emit('updateRacing', me.value)
  }
}

// Lifecycle
onMounted(() => {
  // Simulate loading quote text
  // getRacing().then(() => {
  //   quoteText.value = sRacing.quote.text
  //   racing.value.loading = false
  // })

  // For now, just set a sample text
  racing.value.loading = false
})
</script>

<style lang="scss" scoped>
.race-container {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 1rem;
}

.run__loading-flag {
  text-align: center;
  padding: 2rem;
  font-size: 1.2rem;
  color: #6b7280;
}

.pre-race {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  padding: 2rem;
}

.semaphore-container {
  display: flex;
  justify-content: center;
}

.countdown {
  text-align: center;
}

.start-btn {
  background-color: #ace82c;
  color: white;
  border: none;
  padding: 1rem 2rem;
  font-size: 1.1rem;
  font-weight: 600;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover:not(:disabled) {
    background-color: #9bd327;
    transform: translateY(-2px);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
}

.race-active {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.speedometer-container {
  display: flex;
  justify-content: center;
  padding: 1rem;
  background: #f8fafc;
  border-radius: 1rem;
  border: 2px solid #e2e8f0;
}

.racetrack-container {
  background: #f1f5f9;
  padding: 1rem;
  border-radius: 1rem;
  border: 2px solid #cbd5e1;
}

.typing-section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.race-completed {
  text-align: center;
  padding: 2rem;
  background: #f0fdf4;
  border: 2px solid #86efac;
  border-radius: 1rem;

  h2 {
    margin-bottom: 0.5rem;
  }

  p {
    color: #166534;
  }
}

@media (max-width: 768px) {
  .race-container {
    padding: 0.5rem;
    gap: 1rem;
  }

  .speedometer-container,
  .racetrack-container {
    padding: 0.5rem;
  }
}
</style>

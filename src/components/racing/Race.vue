<template>
    <div>
        <div>
          <div v-if="racing.loading" class="run__loading-flag">
            <div>Loading text</div>
          </div>
          <div v-else-if="!racing.started" class="countdown">
            <button @click="startRacing" class="start-btn">Start Racing ({{ timer }}s)</button>
          </div>
        </div>
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
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import QuoteBox from '@/components/typing/QuoteBox.vue'
import TypeBox from '@/components/typing/TypeBox.vue'
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
  me.value.wpm = getWPM()
  me.value.wpmHistory?.push(getPartialWPM())
}

const startRacing = () => {
  racing.value.started = true
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
.carbon {
  width: 300px;
  height: 300px;
}

.run {
  &__loading-flag {
    text-align: center;
    padding: 20px;
    
    &__img {
      height: 92px;
    }
  }
}

.countdown {
  text-align: center;
  padding: 20px;
}

.start-btn {
  background-color: #ace82c;
  color: white;
  border: none;
  padding: 12px 24px;
  font-size: 16px;
  border-radius: 4px;
  cursor: pointer;
  
  &:hover {
    background-color: #9bd327;
  }
}

.racing-panel {
  display: flex;
  flex-direction: row;
}
</style>

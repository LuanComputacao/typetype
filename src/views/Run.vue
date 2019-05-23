<template>
    <div>
        <div>
          <CountDown :time="timer" @done="startRacing"></CountDown>
        </div>
        <RacingTracker :racers="racers"></RacingTracker>
        <div>
          {{racing}}
          words: {{wordsTyped}}
        </div>
        <QuoteBox :text="quote" :typed="typed" :current-word="currentWord" :current-word-typed="currentWordTyping"></QuoteBox>
        <TypeBox v-if="!typingDone" :lock="inputLock" :word="currentWordTyping" @input="updateRacing"></TypeBox>
    </div>
</template>

<script>
import QuoteBox from '@/components/QuoteBox.vue'
import RacingTracker from '@/components/RacingTracker.vue'
import TypeBox from '@/components/TypeBox.vue'
import CountDown from '@/components/for-racing/CountDown.vue'
import moment from 'moment'

export default {
  components: {
    CountDown,
    QuoteBox,
    TypeBox,
    RacingTracker
  },

  data () {
    return {
      timer: 6,
      inputLock: true,
      wordRegex: /[\w\u00E0-\u00FC]* ?/,
      quote: 'Olá mundo novo e lindo',
      typed: '',
      currentWord: '',
      currentWordTyping: '',
      wordsTyped: 0,
      racers: [
        {
          name: 'You',
          username: 'you',
          progress: 50
        },
        {
          name: 'Friend',
          username: 'friend',
          progress: 30
        }
      ],
      racing: {
        startedAt: 0,
        velocity: 0,
        lastWordStartedAt: 0
      }
    }
  },

  computed: {
    typingDone () {
      return this.quote === this.typed
    }
  },

  methods: {

    startRacing () {
      this.startTimer()
      this.startTyping()
    },

    startTimer () {
      this.racing.startedAt = moment()
    },

    startTyping () {
      this.currentWord = this.getNextWord()
      this.inputLock = false
    },

    incrementTypedWord () {
      if (this.currentWord !== '') this.wordsTyped += 1
    },

    updateRacing (e) {
      let isNewWord = this.updateCurrentWord(e)
      if (isNewWord) this.incrementTypedWord()
    },

    updateCurrentWord (e) {
      if (e === this.currentWord) {
        this.typed += this.currentWord
        this.currentWord = this.getNextWord()
        this.currentWordTyping = ''
        return true
      } else {
        this.currentWordTyping = e
        return false
      }
    },

    getNextWord () {
      let tail = this.quote.slice(this.typed.length)
      let next = tail.match(this.wordRegex)[0]
      return next
    }
  }

}
</script>

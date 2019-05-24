<template>
    <div>
        <div>
          <div v-if="loadingRacing">
            <img alt="Vue logo" src="../assets/flag.gif">
          </div>
          <CountDown v-else :time="timer" @done="startRacing"></CountDown>
        </div>
        <RacingTracker :racers="racers" :me="me"></RacingTracker>
        <div>
          {{racing}}
          words: {{wordsTyped}}
        </div>
        <QuoteBox :text="quoteText" :typed="typed" :current-word="currentWord" :current-word-typed="currentWordTyping"></QuoteBox>
        <TypeBox v-if="!typingDone" :lock="inputLock" :word="currentWordTyping" @input="updateRacing"></TypeBox>
    </div>
</template>

<script>
import QuoteBox from '@/components/QuoteBox.vue'
import RacingTracker from '@/components/RacingTracker.vue'
import TypeBox from '@/components/TypeBox.vue'
import CountDown from '@/components/for-racing/CountDown.vue'
import { mapActions, mapState } from 'vuex'

export default {
  components: {
    CountDown,
    QuoteBox,
    TypeBox,
    RacingTracker
  },

  data () {
    return {
      currentWord: '',
      currentWordTyping: '',
      inputLock: true,
      timer: 3,
      typed: '',
      quoteText: 'Therefore, is it perhaps appropriate to consider the US South as the northernmost reach of the Latin American and Caribbean world? Scholars of the seventeenth through nineteenth centuries would hardly object, as studies of slavery, emancipation, and the black diaspora have long connected the plantation colony of the South with those of Cuba, Brazil, Haiti, and Mexico.',
      wordRegex: /[^ ]* ?/,
      wordsTyped: 0,
      loadingRacing: true,
      me: {
        name: 'Me',
        username: 'me',
        progress: 50,
        wpm: 0,
        wpmHistory: []
      },
      racers: [
        {
          name: 'You',
          username: 'you',
          progress: 50,
          wpm: 0
        },
        {
          name: 'Friend',
          username: 'friend',
          progress: 30
        }
      ],
      racing: {
        startedAt: 0,
        lastWordStartedAt: 0
      }
    }
  },

  created () {
    this.getRacing().then(() => {
      this.quoteText = this.sRacing.quote.text
      this.loadingRacing = false
    })
  },

  computed: {
    ...mapState({
      sRacing: state => state.racing.racing
    }),
    typingDone () {
      return this.quoteText === this.typed
    }
  },

  methods: {
    ...mapActions('racing', {
      getRacing: 'getRacing'
    }),

    calculateProgress () {
      this.me.progress = (this.typed.length * 100) / this.quoteText.length
    },

    incrementTypedWord () {
      this.wordsTyped += 1
    },

    getNextWord () {
      let tail = this.quoteText.slice(this.typed.length)
      let next = tail.match(this.wordRegex)[0]
      return next
    },

    getPartialWPM () {
      return ((this.lastWordTyped.length - 1) / (this.timeDeltaSec(Date.now(), this.racing.lastWordStartedAt))) * 60 * (1 / 5)
    },

    getWPM () {
      return ((this.typed.length - 1) / (this.timeDeltaSec(Date.now(), this.racing.startedAt))) * 60 * (1 / 5)
    },

    registerCurrentVelocity () {
      this.me.wpm = this.getWPM()
      this.me.wpmHistory.push(this.getPartialWPM())
    },

    startRacing () {
      this.startTimer()
      this.startTyping()
    },

    startTimer () {
      let now = Date.now()
      this.racing.startedAt = now
      this.racing.lastWordStartedAt = now
    },

    startTyping () {
      this.currentWord = this.getNextWord()
      this.inputLock = false
    },

    timeDeltaSec (after, before) {
      return (after - before) / 1000
    },

    updateCurrentWord (e) {
      if (e === this.currentWord) {
        this.typed += this.currentWord
        this.lastWordTyped = this.currentWord
        this.currentWord = this.getNextWord()
        this.currentWordTyping = ''
        return true
      } else {
        this.currentWordTyping = e
        return false
      }
    },

    updateRacing (e) {
      let isNewWord = this.updateCurrentWord(e)
      if (isNewWord) {
        this.incrementTypedWord()
        this.registerCurrentVelocity()
        this.calculateProgress()
        this.racing.lastWordStartedAt = Date.now()
        this.$emit('updateRacing', this.me)
      }
    }

  }

}
</script>

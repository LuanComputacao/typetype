<template>
    <div>
        <div>
          <div v-if="racing.loading" class="run__loadin-flag">
            <div>Loading text</div>
            <img class="run__loadin-flag__img" alt="Vue logo" src="../assets/flag.gif">
          </div>
          <CountDown v-else-if="!racing.started" :time="timer" @done="startRacing"></CountDown>
        </div>
        <div class="racing-panel">
          <RacingTracker :racers="racers" :me="me"></RacingTracker>
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
      quoteText: 'Waiting your text',
      wordRegex: /[^ ]* ?/,
      wordsTyped: 0,
      me: {
        name: 'Me',
        username: 'me',
        progress: 0,
        wpm: 0,
        wpmHistory: []
      },
      racers: [],
      racing: {
        loading: true,
        started: false,
        startedAt: 0,
        lastWordStartedAt: 0
      }
    }
  },

  created () {
    this.getRacing().then(() => {
      this.quoteText = this.sRacing.quote.text
      this.racing.loading = false
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
      this.racing.started = true
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
<style lang="scss" scoped>
.carbon{
  width: 300px;
  height: 300px;
}
.run{
  &__loadin-flag{
    &__img{
      height: 92px;
    }
  }
}

.racing-panel{
  display: flex;
  flex-direction: row;
}
</style>

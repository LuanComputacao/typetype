<template>
  <span class="word" :class="{'word__wrong': !correct}">
    <span class="word__head">{{typedCorrect}}</span>
    <span class="word__wrong-letter">{{wrongLetter}}</span>
    <span class="word__tail">{{endWord}}</span>
  </span>
</template>

<script>
export default {
  name: 'CurrentWord',

  props: {
    word: {
      type: String,
      required: true
    },

    typed: {
      type: String,
      required: true
    }
  },

  data () {
    return {

    }
  },

  computed: {
    correct () {
      return this.typedCorrect === this.typed
    },

    typedCorrect () {
      return this.processHead(this.word, this.typed)
    },

    wrongLetter () {
      if (!this.correct) {
        return this.word.slice(this.typedCorrect.length).slice(0, 1)
      } else {
        return ''
      }
    },

    endWord () {
      if (this.correct) {
        return this.word.slice(this.typedCorrect.length)
      } else {
        return this.word.slice(this.typedCorrect.length + 1)
      }
    }
  },

  methods: {
    processHead (w, t) {
      if (w.startsWith(t)) {
        return t
      } else {
        return this.processHead(w, t.slice(0, -1))
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.word{
  text-decoration: underline;
  &__head{
    color: #ace82c;
  }
  &__wrong-letter{
    color: red;
  }

  &__tail{
    color: #446666;
  }
}
</style>

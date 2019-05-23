<template>
    <div class="quote">
        <div class="quote__text">
          <span class="quote__typed">{{typed}}</span>
          <CurrentWord :word="currentWord" :typed="currentWordTyped"></CurrentWord>
          <span>{{quoteTail}}</span>
        </div>
    </div>
</template>
<script>
import CurrentWord from '@/components/for-quotes/CurrentWord.vue'

export default {
  name: 'QuoteBox',

  components: {
    CurrentWord
  },

  props: {
    text: {
      type: String,
      required: true
    },

    typed: {
      type: String,
      required: true
    },

    currentWord: {
      type: String,
      required: true
    },

    currentWordTyped: {
      type: String,
      required: true
    }
  },

  data () {
    return {
      typingCorrect: true
    }
  },

  computed: {
    quoteTail () {
      return this.text.slice(this.typed.length + this.currentWord.length)
    }
  },

  methods: {
  }
}
</script>

<style lang="scss" scoped>
.quote{
    background-color: #fafafa;;
    padding: 20px;
    font-size: 16px;

    &__untyped{
        color: #446666;
    }

    &__text{
      border: solid 1px #c4c4c4;
      border-radius: 3px;
      padding: 20px;
    }

    &__typing{
        text-decoration: underline;
    }

    &__typed{
        color: #ace82c;
    }

    &__misstyping{
        color: red;
    }
}
</style>

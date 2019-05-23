<template>
  <div class="quote-typing">
    <div>{{text}}</div>
    <div>{{typed}}</div>
    <div>
      <span class="quote__typed">{{typed}}</span>
      <span>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'QuoteTyping',

  props: {
    text: {
      type: String,
      required: true
    },
    typed: {
      type: String
    }
  },

  computed: {
    typingResult () {
      return this.text
    }
  }
}
</script>

<style lang="scss" scoped>
.quote-typing{
  border: solid 2px #c4c4c4;
  border-radius: 3px;
}

.quote{
  &__typed{
    color: #ace82c;
  }
}
</style>

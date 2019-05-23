<template>
    <div>
        <div v-if="!lock">
          <input type="text" class="current-word" name="current-word" :value="word" @input="riseTyping" >
        </div>
        <div v-else>
          Wait to type ...
        </div>
    </div>
</template>

<script>
export default {
  name: 'TypeBox',

  props: ['word', 'lock'],

  data () {
    return {
      wordSeparator: [
        ' '
      ]
    }
  },

  methods: {
    riseTyping (event) {
      if (this.wordSeparator.indexOf(event.target.value) === -1) {
        return this.$emit('input', event.target.value)
      } else {
        return this.$emit('update', event.target.value)
      }
    }
  }
}
</script>

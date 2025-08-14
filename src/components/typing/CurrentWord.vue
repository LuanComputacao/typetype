<template>
  <span class="word" :class="{'word__wrong': !correct}">
    <span class="word__head">{{typedCorrect}}</span>
    <span class="word__wrong-letter">{{wrongLetter}}</span>
    <span class="word__tail">{{endWord}}</span>
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  word: string
  typed: string
}

const props = defineProps<Props>()

const processHead = (w: string, t: string): string => {
  if (w.startsWith(t)) {
    return t
  } else {
    return processHead(w, t.slice(0, -1))
  }
}

const typedCorrect = computed(() => {
  return processHead(props.word, props.typed)
})

const correct = computed(() => {
  return typedCorrect.value === props.typed
})

const wrongLetter = computed(() => {
  if (!correct.value) {
    return props.word.slice(typedCorrect.value.length).slice(0, 1)
  } else {
    return ''
  }
})

const endWord = computed(() => {
  if (correct.value) {
    return props.word.slice(typedCorrect.value.length)
  } else {
    return props.word.slice(typedCorrect.value.length + 1)
  }
})
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

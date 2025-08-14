<template>
    <div class="quote">
        <div class="quote__text">
          <span class="quote__typed">{{typed}}</span>
          <CurrentWord :word="currentWord" :typed="currentWordTyped"></CurrentWord>
          <span>{{quoteTail}}</span>
        </div>
    </div>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import CurrentWord from '@/components/typing/CurrentWord.vue'

interface Props {
  text: string
  typed: string
  currentWord: string
  currentWordTyped: string
}

const props = defineProps<Props>()

const quoteTail = computed(() => {
  return props.text.slice(props.typed.length + props.currentWord.length)
})
</script>

<style lang="scss" scoped>
.quote{
    background-color: #fafafa;
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

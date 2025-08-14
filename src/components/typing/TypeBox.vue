<template>
    <div>
        <div v-if="!lock">
          <input
            ref="inputRef"
            type="text"
            class="current-word"
            name="current-word"
            :value="word"
            @input="handleTyping"
          >
        </div>
        <div v-else>
          Wait to type ...
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick, watch } from 'vue'

interface Props {
  word?: string
  lock?: boolean
}

interface Emits {
  (e: 'input', value: string): void
  (e: 'update', value: string): void
}

const props = withDefaults(defineProps<Props>(), {
  word: '',
  lock: false
})

const emit = defineEmits<Emits>()

const inputRef = ref<HTMLInputElement>()

const wordSeparator = [' ']

const handleTyping = (event: Event) => {
  const target = event.target as HTMLInputElement
  const value = target.value

  if (wordSeparator.indexOf(value) === -1) {
    emit('input', value)
  } else {
    emit('update', value)
  }
}

// Auto-focus functionality (replacing v-focus directive)
const focusInput = async () => {
  await nextTick()
  if (inputRef.value && !props.lock) {
    inputRef.value.focus()
  }
}

onMounted(() => {
  focusInput()
})

// Re-focus when lock changes
watch(() => props.lock, (newLock) => {
  if (!newLock) {
    focusInput()
  }
})
</script>

<style lang="scss" scoped>
.current-word {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 2px solid #c4c4c4;
  border-radius: 4px;
  outline: none;

  &:focus {
    border-color: #ace82c;
    box-shadow: 0 0 0 2px rgba(172, 232, 44, 0.2);
  }
}
</style>

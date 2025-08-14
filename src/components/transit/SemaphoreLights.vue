<template>
  <div>
    <div class="semaphore">
      <div class="semaphore__lights">
        <div
          v-for="index in amountOfLights"
          :key="index"
          :class="[
            'semaphore__light',
            `semaphore__light--red`,
            {
              'semaphore__light--on': index <= counter,
            },
          ]"
        ></div>
      </div>
    </div>
    <div class="semaphore">
      <div class="semaphore__lights">
        <div
          v-for="index in amountOfLights"
          :key="index"
          :class="[
            'semaphore__light',
            `semaphore__light--green`,
            {
              'semaphore__light--on': counter === maxCounter,
            },
          ]"
        ></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, onMounted, computed } from 'vue'

const props = defineProps<{
  counter: number
  maxCounter?: number
}>()

const maxCounter = computed(() => props.maxCounter ?? 5)
const counter = computed(() => props.counter ?? 1)
const amountOfLights = ref(0)

onMounted(() => {
  amountOfLights.value = maxCounter.value - 1
})
</script>

<style lang="scss">
.semaphore {
  $light-size: 3rem;
  $pattern-size: 10px;

  $pattern-dark: #000000;
  $pattern-light: #00000055;
  $pattern-bg: #252525;

  border-radius: 0.5rem;
  color: #f6f6f6;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: fit-content;
  margin: 10px;
  opacity: 0.8;
  background: linear-gradient(135deg, $pattern-light 25%, transparent 25%) -10px 0,
    linear-gradient(225deg, $pattern-dark 25%, transparent 25%) -10px 0,
    linear-gradient(315deg, $pattern-light 25%, transparent 25%) 0px 0,
    linear-gradient(45deg, $pattern-dark 25%, $pattern-bg 25%) 0px 0;
  background-size: $pattern-size $pattern-size;

  &__lights {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }

  &__light {
    $color-green: #56b160;
    $color-red: #f96666;

    align-items: center;
    background-clip: padding-box;
    border: 3px solid transparent;
    border-radius: 100px;
    height: $light-size;
    margin: 10px;
    position: relative;
    width: $light-size;

    &::before {
      content: '';
      position: absolute;
      top: -3px;
      left: -3px;
      right: -3px;
      bottom: -3px;
      background: linear-gradient(45deg, #000000, #7a7a7a, #2f3f43, #000000);
      border-radius: 100px;
      z-index: -1;
    }

    &--red {
      background-color: #848484;
      background-image: radial-gradient(circle at center center, $color-red, #fba5a5),
        repeating-radial-gradient(
          circle at center center,
          $color-red,
          $color-red,
          calc($pattern-size / 5),
          transparent calc($pattern-size / 2.5),
          transparent calc($pattern-size / 5)
        );
      background-blend-mode: multiply;
    }

    &--green {
      background-color: #4e895b;
      background-image: radial-gradient(circle at center center, $color-green, #51a072),
        repeating-radial-gradient(
          circle at center center,
          $color-green,
          $color-green,
          calc($pattern-size / 5),
          transparent calc($pattern-size / 2.5),
          transparent calc($pattern-size / 5)
        );
      background-blend-mode: multiply;
    }

    &--on {
      background-color: #ffffff;
    }
  }
}
</style>

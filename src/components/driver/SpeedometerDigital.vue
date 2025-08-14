<template>
  <div class="speedometer">
    <div class="velocity">
    <div class="velocity-bar">
      <div class="velocity-bar__on" :style="{width: velocityBarOn + '%'}">
        <div class="velocity-bar__led" v-for="i in ledCount" :key="i"></div>
      </div>
      <div class="velocity-bar__off" :style="{width: (100 - velocityBarOn) + '%'}"></div>
    </div>
      <div class="velocity__current">
        <span class="velocity__numbers">{{ velocityLastWord.toFixed(2) }}</span>
        <span class="velocity__letters"> w/m</span>
      </div>
      <div class="velocity__total">
        <span class="velocity__numbers">{{ velocity.toFixed(2) }}</span>
        <span class="velocity__letters"> w/m</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  velocity: number // Velocidade total
  velocityLastWord: number // Última palavra da velocidade
}

const props = withDefaults(defineProps<Props>(), {
  velocity: 0,
  velocityLastWord: 0
})
const hightVelocity = computed(() => {
  // Define a velocidade máxima como 256 w/m conforme especificado
  return 256
})

const velocityBarOn = computed(() => {
  const percentage = (props.velocity / hightVelocity.value) * 100
  return Math.min(percentage, 100) // Limita a porcentagem a 100%
})

const ledCount = computed(() => {
  // Calcula o número de LEDs baseado na porcentagem, garantindo um número inteiro positivo
  const count = Math.floor(velocityBarOn.value / 2)
  return Math.max(0, count) // Garante que não seja negativo
})

</script>

<style lang="scss" scoped>
$bar-width: 256px;
$bar-height: 20px;

.speedometer{
  padding: 10px;
  display: flex;
  border: solid 1px #00ff00;
  background-color: #333333;
  justify-content: center;
  border-radius: 8px;
}

.velocity-bar{
  width: $bar-width;
  display: flex;

  &__on{
    background-color: #00ff00;
    height: $bar-height;
    display: flex;
    flex-direction: row;
  }

  &__off{
    background-color: #004400;
    height: $bar-height;
  }

  &__led{
    width: 3px;
    height: $bar-height;
    border-right: solid 2px #333333;
  }
  }

.velocity{
  &__current{
    color: #00ff00;
    font-size: 2.5em;
  }
  &__total{
    color: #ffff00;
    font-size: 1.5em;
  }
  &__numbers{
    font-family: 'Courier New', monospace;
    font-size: 1em;
    font-weight: bold;
  }
  &__letters{
    text-transform: uppercase;
    font-size: 0.5em;
  }
}

</style>

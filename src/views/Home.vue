<template>
  <div key="home" class="home m-8">
    <h1 class="text-4xl font-bold mb-4">Welcome to Your Vue.js App</h1>
    <p class="mb-2">This is a simple Vue.js application using TypeScript and Tailwind CSS.</p>
    <p>Start building your app by editing <code>src/views/Home.vue</code>.</p>

    <!-- Semaphore Lights -->
    <div class="mb-8">
      <h2 class="text-2xl font-semibold mb-4">Traffic Light</h2>
      <SemaphoreLights :counter="counter" :maxCounter="5" />
    </div>

    <!-- Car Components Demo -->
    <div class="mb-8">
      <h2 class="text-2xl font-semibold mb-4">Car Components</h2>

      <!-- Different car variants -->
      <div class="mb-6">
        <h3 class="text-lg font-medium mb-2">Car Variants</h3>
        <div class="flex gap-4 items-center flex-wrap">
          <Car :variant="1" size="small" :animated="true" />
          <Car :variant="2" size="small" :animated="true" />
          <Car :variant="3" size="small" :animated="true" />
          <Car :variant="4" size="small" :animated="true" />
        </div>
      </div>

      <!-- Different sizes -->
      <div class="mb-6">
        <h3 class="text-lg font-medium mb-2">Car Sizes</h3>
        <div class="flex gap-4 items-end">
          <Car :variant="1" size="small" />
          <Car :variant="1" size="medium" />
          <Car :variant="1" size="large" />
        </div>
      </div>

      <!-- Different directions -->
      <div class="mb-6">
        <h3 class="text-lg font-medium mb-2">Car Directions</h3>
        <div class="flex gap-4 items-center">
          <Car :variant="2" direction="left" />
          <Car :variant="2" direction="right" />
        </div>
      </div>

      <!-- Driving animation -->
      <div class="mb-6">
        <h3 class="text-lg font-medium mb-2">Driving Animation</h3>
        <div class="bg-gray-200 p-4 rounded-lg overflow-hidden relative" style="height: 100px">
          <Car :variant="3" :driving="true" size="small" />
        </div>
        <p class="text-sm text-gray-600 mt-2">
          O carro vai dirigir da esquerda para a direita continuamente
        </p>
      </div>

      <!-- Speed effects -->
      <div class="mb-6">
        <h3 class="text-lg font-medium mb-2">Efeitos de Velocidade</h3>

        <!-- Low speed -->
        <div class="mb-4">
          <h4 class="text-md font-medium mb-2">Velocidade Baixa (20/100)</h4>
          <div class="bg-gray-100 p-4 rounded-lg">
            <Car :variant="1" :speed="20" :min-speed="0" :max-speed="100" size="medium" />
          </div>
          <p class="text-sm text-gray-600 mt-1">Vibração leve + fumaça sutil (1-2 partículas)</p>
        </div>

        <!-- Medium speed -->
        <div class="mb-4">
          <h4 class="text-md font-medium mb-2">Velocidade Média (50/100)</h4>
          <div class="bg-gray-100 p-4 rounded-lg">
            <Car :variant="2" :speed="50" :min-speed="0" :max-speed="100" size="medium" />
          </div>
          <p class="text-sm text-gray-600 mt-1">
            Vibração moderada + fumaça média (3-4 partículas)
          </p>
        </div>

        <!-- High speed -->
        <div class="mb-4">
          <h4 class="text-md font-medium mb-2">Velocidade Alta (80/100)</h4>
          <div class="bg-gray-100 p-4 rounded-lg">
            <Car :variant="3" :speed="80" :min-speed="0" :max-speed="100" size="medium" />
          </div>
          <p class="text-sm text-gray-600 mt-1">Vibração intensa + fumaça densa (6-7 partículas)</p>
        </div>

        <!-- Maximum speed -->
        <div class="mb-4">
          <h4 class="text-md font-medium mb-2">Velocidade Máxima (100/100)</h4>
          <div class="bg-gray-100 p-4 rounded-lg">
            <Car :variant="4" :speed="100" :min-speed="0" :max-speed="100" size="medium" />
          </div>
          <p class="text-sm text-gray-600 mt-1">Vibração máxima + fumaça intensa (8 partículas)</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

import SemaphoreLights from '@/components/transit/SemaphoreLights.vue'
import Car from '@/components/Car.vue'

const counter = ref(0)
let intervalId: ReturnType<typeof setInterval> | null = null

onMounted(() => {
  intervalId = setInterval(() => {
    counter.value++
    if (counter.value > 5) {
      counter.value = 0
    }
  }, 1000)
})

onUnmounted(() => {
  if (intervalId) {
    clearInterval(intervalId)
  }
})
</script>

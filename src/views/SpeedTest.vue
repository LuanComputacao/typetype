<template>
  <div class="speed-test p-8">
    <h1 class="text-4xl font-bold mb-8 text-center">Teste de Velocidade</h1>
    <p class="text-lg mb-8 text-center text-gray-600">
      Controle a velocidade do carro na pista e veja o velocímetro em tempo real
    </p>

    <!-- Navigation Menu -->
    <div class="mb-8 text-center">
      <div class="inline-flex gap-4 bg-gray-100 p-4 rounded-lg">
        <router-link
          to="/"
          class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
        >
          🏠 Demonstrações
        </router-link>
        <router-link
          to="/speed-test"
          class="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
        >
          🏎️ Teste de Velocidade
        </router-link>
      </div>
    </div>

    <!-- Speedometer Section -->
    <div class="mb-8">
      <h2 class="text-2xl font-semibold mb-4 text-center text-blue-600">📊 Velocímetro Digital</h2>
      <div class="flex justify-center">
        <div class="bg-gray-800 p-6 rounded-lg">
          <SpeedometerDigital
            :velocity="currentSpeed"
            :velocity-last-word="currentSpeed - 5"
          />
        </div>
      </div>
    </div>

    <!-- Race Track Section -->
    <div class="mb-8">
      <h2 class="text-2xl font-semibold mb-4 text-center text-green-600">🏁 Pista de Corrida</h2>
      <div class="bg-gray-100 p-6 rounded-lg">
        <RaceTrack
          :lanes="1"
          track-height="150px"
          :cars="[{
            variant: 1,
            position: carPosition,
            lane: 1,
            speed: currentSpeed,
            direction: 'right',
            size: 'medium',
            color: 'blue'
          }]"
        />
      </div>
    </div>

    <!-- Speed Control Section -->
    <div class="mb-8">
      <h2 class="text-2xl font-semibold mb-4 text-center text-purple-600">⚙️ Controle de Velocidade</h2>
      <div class="bg-white p-6 rounded-lg border shadow-sm">
        <div class="max-w-md mx-auto">
          <!-- Speed Input -->
          <div class="mb-6">
            <label for="speed-input" class="block text-sm font-medium text-gray-700 mb-2">
              Velocidade (w/m)
            </label>
            <input
              id="speed-input"
              v-model.number="inputSpeed"
              type="number"
              min="0"
              max="256"
              step="1"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-center text-xl font-mono"
              placeholder="0-256"
            />
            <p class="text-xs text-gray-500 mt-1 text-center">
              Máximo: 256 w/m (palavras por minuto)
            </p>
          </div>

          <!-- Speed Range Slider -->
          <div class="mb-6">
            <label for="speed-range" class="block text-sm font-medium text-gray-700 mb-2">
              Controle Deslizante
            </label>
            <input
              id="speed-range"
              v-model.number="inputSpeed"
              type="range"
              min="0"
              max="256"
              step="1"
              class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            />
            <div class="flex justify-between text-xs text-gray-500 mt-1">
              <span>0</span>
              <span>128</span>
              <span>256</span>
            </div>
          </div>

          <!-- Apply Speed Button -->
          <div class="text-center">
            <button
              @click="applySpeed"
              class="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              🚀 Aplicar Velocidade
            </button>
          </div>

          <!-- Current Speed Display -->
          <div class="mt-6 p-4 bg-gray-50 rounded-lg text-center">
            <p class="text-sm text-gray-600">Velocidade Atual</p>
            <p class="text-2xl font-bold text-blue-600">{{ currentSpeed }} w/m</p>
            <p class="text-sm text-gray-500">
              {{ getSpeedCategory(currentSpeed) }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Speed Presets -->
    <div class="mb-8">
      <h3 class="text-xl font-medium mb-4 text-center">🎯 Presets de Velocidade</h3>
      <div class="flex gap-4 justify-center flex-wrap">
        <button
          @click="setPresetSpeed(25)"
          class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm"
        >
          🐌 Iniciante (25 w/m)
        </button>
        <button
          @click="setPresetSpeed(65)"
          class="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg text-sm"
        >
          ⚡ Intermediário (65 w/m)
        </button>
        <button
          @click="setPresetSpeed(120)"
          class="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm"
        >
          🏃 Avançado (120 w/m)
        </button>
        <button
          @click="setPresetSpeed(256)"
          class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm"
        >
          🚀 Máximo (256 w/m)
        </button>
      </div>
    </div>

    <!-- Animation Controls -->
    <div class="mb-8">
      <h3 class="text-xl font-medium mb-4 text-center">🎮 Controles de Animação</h3>
      <div class="flex gap-4 justify-center">
        <button
          @click="startMovement"
          :disabled="isMoving"
          class="bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg"
        >
          ▶️ Iniciar Movimento
        </button>
        <button
          @click="stopMovement"
          class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
        >
          ⏹️ Parar
        </button>
        <button
          @click="resetPosition"
          class="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg"
        >
          🔄 Resetar Posição
        </button>
      </div>
    </div>

    <!-- Information -->
    <div class="bg-blue-50 p-6 rounded-lg">
      <h3 class="font-medium text-blue-800 mb-3">ℹ️ Como Usar:</h3>
      <div class="text-blue-700 text-sm space-y-2">
        <p>• <strong>Campo Numérico:</strong> Digite a velocidade desejada (0-256 w/m)</p>
        <p>• <strong>Slider:</strong> Arraste para ajustar a velocidade visualmente</p>
        <p>• <strong>Botão Aplicar:</strong> Aplica a velocidade ao carro e velocímetro</p>
        <p>• <strong>Presets:</strong> Velocidades pré-definidas para teste rápido</p>
        <p>• <strong>Movimento:</strong> Controla se o carro se move na pista</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onUnmounted } from 'vue'
import SpeedometerDigital from '@/components/driver/SpeedometerDigital.vue'
import RaceTrack from '@/components/transit/RaceTrack.vue'

// Estado reativo
const inputSpeed = ref(0)
const currentSpeed = ref(0)
const carPosition = ref(10)
const isMoving = ref(false)

// Intervalo para movimento do carro
let movementInterval: ReturnType<typeof setInterval> | null = null

// Função para aplicar velocidade
const applySpeed = () => {
  // Limita a velocidade entre 0 e 256
  const speed = Math.max(0, Math.min(256, inputSpeed.value))
  inputSpeed.value = speed
  currentSpeed.value = speed
}

// Função para definir velocidade preset
const setPresetSpeed = (speed: number) => {
  inputSpeed.value = speed
  applySpeed()
}

// Função para categorizar velocidade
const getSpeedCategory = (speed: number): string => {
  if (speed === 0) return 'Parado'
  if (speed <= 30) return 'Iniciante'
  if (speed <= 70) return 'Intermediário'
  if (speed <= 130) return 'Avançado'
  if (speed <= 200) return 'Expert'
  return 'Profissional'
}

// Controle de movimento do carro
const startMovement = () => {
  if (isMoving.value) return

  isMoving.value = true
  movementInterval = setInterval(() => {
    // Velocidade de movimento baseada na velocidade atual
    // Velocidade alta = movimento mais rápido
    const increment = (currentSpeed.value / 256) * 2 + 0.2
    carPosition.value += increment

    // Reset quando chega ao final
    if (carPosition.value > 95) {
      carPosition.value = 5
    }
  }, 100)
}

const stopMovement = () => {
  isMoving.value = false
  if (movementInterval) {
    clearInterval(movementInterval)
    movementInterval = null
  }
}

const resetPosition = () => {
  stopMovement()
  carPosition.value = 10
}

// Limpeza ao desmontar componente
onUnmounted(() => {
  stopMovement()
})
</script>

<style scoped>
/* Estilo personalizado para o slider */
.slider::-webkit-slider-thumb {
  appearance: none;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #3b82f6;
  cursor: pointer;
  border: 2px solid #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.slider::-moz-range-thumb {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #3b82f6;
  cursor: pointer;
  border: 2px solid #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.slider:focus {
  outline: none;
}

.slider::-webkit-slider-track {
  background: #e5e7eb;
  border-radius: 4px;
}

.slider::-moz-range-track {
  background: #e5e7eb;
  border-radius: 4px;
}
</style>

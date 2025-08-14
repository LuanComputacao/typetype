<template>
  <div class="race-run">
    <!-- Header -->
    <div class="race-header">
      <h1 class="text-4xl font-bold text-center mb-4">🏁 Corrida de Digitação</h1>
      <p class="text-lg text-center text-gray-600 mb-8">
        Digite o texto o mais rápido possível e compete contra o tempo!
      </p>

      <!-- Navigation -->
      <div class="navigation mb-8">
        <router-link to="/" class="nav-link">🏠 Home</router-link>
        <router-link to="/speed-test" class="nav-link">📊 Speed Test</router-link>
        <span class="nav-link nav-link--active">🏁 Race Run</span>
      </div>
    </div>

    <!-- Main Race Component -->
    <div class="race-container">
      <!-- Countdown Configuration (only when race not started) -->
      <div v-if="!raceStore.race.started && !raceStore.race.completed" class="countdown-config">
        <label for="countdown-select" class="config-label">⏱️ Countdown do Semáforo:</label>
        <select
          id="countdown-select"
          v-model="selectedCountdown"
          @change="updateCountdown"
          class="countdown-select"
          :disabled="raceStore.semaphore.countdownRunning"
        >
          <option value="3">3 segundos (2 luzes)</option>
          <option value="5">5 segundos (4 luzes)</option>
          <option value="7">7 segundos (6 luzes)</option>
        </select>
      </div>

      <Race @updateRacing="handleRaceUpdate" />
    </div>

    <!-- Instructions -->
    <div class="instructions mt-8">
      <h3 class="text-xl font-semibold mb-4">📋 Como Jogar:</h3>
      <div class="instruction-grid">
        <div class="instruction-item">
          <span class="instruction-icon">🎯</span>
          <div>
            <h4 class="font-medium">Objetivo</h4>
            <p class="text-sm text-gray-600">Digite o texto exibido o mais rápido e preciso possível</p>
          </div>
        </div>
        <div class="instruction-item">
          <span class="instruction-icon">⚡</span>
          <div>
            <h4 class="font-medium">Velocidade</h4>
            <p class="text-sm text-gray-600">Sua velocidade é medida em palavras por minuto (WPM)</p>
          </div>
        </div>
        <div class="instruction-item">
          <span class="instruction-icon">🎯</span>
          <div>
            <h4 class="font-medium">Precisão</h4>
            <p class="text-sm text-gray-600">Digite cada palavra corretamente antes de prosseguir</p>
          </div>
        </div>
        <div class="instruction-item">
          <span class="instruction-icon">🏆</span>
          <div>
            <h4 class="font-medium">Meta</h4>
            <p class="text-sm text-gray-600">Tente alcançar mais de 40 WPM com precisão</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Results Modal -->
    <div v-if="showResults" class="results-modal" @click="closeResults">
      <div class="results-content" @click.stop>
        <h2 class="text-2xl font-bold mb-4">🎉 Corrida Finalizada!</h2>
        <div class="results-stats">
          <div class="result-item">
            <span class="result-label">Velocidade Final:</span>
            <span class="result-value">{{ finalStats.wpm }} WPM</span>
          </div>
          <div class="result-item">
            <span class="result-label">Palavras Digitadas:</span>
            <span class="result-value">{{ finalStats.words }}</span>
          </div>
          <div class="result-item">
            <span class="result-label">Tempo Total:</span>
            <span class="result-value">{{ finalStats.time }}</span>
          </div>
          <div class="result-item">
            <span class="result-label">Avaliação:</span>
            <span class="result-value">{{ performanceLevel }}</span>
          </div>
        </div>
        <div class="results-actions">
          <button @click="restartRace" class="btn btn-primary">🔄 Nova Corrida</button>
          <button @click="closeResults" class="btn btn-secondary">📊 Ver Stats</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import Race from '@/components/racing/Race.vue'
import { useRaceStore } from '@/stores/race'

interface RacerData {
  name: string
  username: string
  progress: number
  wpm?: number
  wpmHistory?: number[]
}

// Use the race store
const raceStore = useRaceStore()

// Reactive state for results and configuration
const showResults = ref(false)
const raceStats = ref<RacerData | null>(null)
const selectedCountdown = ref(raceStore.semaphore.maxCountdown)

// Final stats for results using store data
const finalStats = computed(() => ({
  wpm: Math.round(raceStore.racer.wpm),
  words: raceStore.racer.wordsTyped,
  time: raceStore.formattedTime,
  progress: Math.round(raceStore.racer.progress)
}))

// Computed properties
const performanceLevel = computed(() => {
  const wpm = finalStats.value.wpm
  if (wpm >= 60) return '🚀 Excepcional'
  if (wpm >= 40) return '⭐ Excelente'
  if (wpm >= 25) return '✅ Bom'
  if (wpm >= 15) return '📈 Regular'
  return '🎯 Iniciante'
})

// Watch for race completion
watch(() => raceStore.isTypingDone, (isDone) => {
  if (isDone) {
    setTimeout(() => {
      showResults.value = true
    }, 1000) // Show results after a brief delay
  }
}, { immediate: false })

// Methods
const handleRaceUpdate = (racer: RacerData) => {
  raceStats.value = racer
}

const updateCountdown = () => {
  const newValue = Number(selectedCountdown.value)
  raceStore.setMaxCountdown(newValue)
}

const restartRace = () => {
  showResults.value = false
  raceStats.value = null
  selectedCountdown.value = raceStore.semaphore.maxCountdown
  raceStore.resetRace()
}

const closeResults = () => {
  showResults.value = false
}
</script>

<style lang="scss" scoped>
.race-run {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  min-height: 100vh;
}

.race-header {
  text-align: center;
  margin-bottom: 2rem;
}

.navigation {
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.nav-link {
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  text-decoration: none;
  transition: all 0.3s ease;

  &:hover {
    background-color: #f3f4f6;
  }

  &--active {
    background-color: #ace82c;
    color: white;
    font-weight: 600;
  }
}

.race-container {
  background: white;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 10px 25px -3px rgba(0, 0, 0, 0.1);
  border: 2px solid #f3f4f6;
}

.countdown-config {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
  padding: 1rem;
  background: #f8fafc;
  border-radius: 0.5rem;
  border: 1px solid #e2e8f0;
}

.config-label {
  font-weight: 600;
  color: #374151;
  white-space: nowrap;
}

.countdown-select {
  padding: 0.5rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  background: white;
  font-size: 0.875rem;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: #ace82c;
    box-shadow: 0 0 0 3px rgba(172, 232, 44, 0.1);
  }

  &:disabled {
    background: #f3f4f6;
    color: #6b7280;
    cursor: not-allowed;
  }
}

.instructions {
  background: #f8fafc;
  padding: 2rem;
  border-radius: 1rem;
  border: 2px solid #e2e8f0;
}

.instruction-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.instruction-item {
  display: flex;
  align-items: start;
  gap: 1rem;
}

.instruction-icon {
  font-size: 1.5rem;
  flex-shrink: 0;
}

.results-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.results-content {
  background: white;
  padding: 3rem;
  border-radius: 1rem;
  max-width: 500px;
  width: 90%;
  text-align: center;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}

.results-stats {
  margin: 2rem 0;
}

.result-item {
  display: flex;
  justify-content: space-between;
  padding: 0.75rem 0;
  border-bottom: 1px solid #e5e7eb;

  &:last-child {
    border-bottom: none;
    font-weight: bold;
    font-size: 1.1rem;
  }
}

.result-label {
  color: #6b7280;
}

.result-value {
  font-weight: 600;
  color: #1f2937;
}

.results-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 2rem;
}

.btn {
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  border: none;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &-primary {
    background-color: #ace82c;
    color: white;

    &:hover {
      background-color: #9bd327;
    }
  }

  &-secondary {
    background-color: #6b7280;
    color: white;

    &:hover {
      background-color: #4b5563;
    }
  }
}

@media (max-width: 768px) {
  .race-run {
    padding: 1rem;
  }

  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .instruction-grid {
    grid-template-columns: 1fr;
  }

  .results-content {
    padding: 2rem;
  }

  .results-actions {
    flex-direction: column;
  }
}
</style>

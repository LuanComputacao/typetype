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

    <!-- Race Stats -->
    <div class="race-stats mb-6">
      <div class="stats-grid">
        <div class="stat-card">
          <h3 class="stat-label">WPM Atual</h3>
          <p class="stat-value">{{ currentWPM }}</p>
        </div>
        <div class="stat-card">
          <h3 class="stat-label">Progresso</h3>
          <p class="stat-value">{{ currentProgress }}%</p>
        </div>
        <div class="stat-card">
          <h3 class="stat-label">Palavras</h3>
          <p class="stat-value">{{ wordsTyped }}</p>
        </div>
        <div class="stat-card">
          <h3 class="stat-label">Tempo</h3>
          <p class="stat-value">{{ formattedTime }}</p>
        </div>
      </div>
    </div>

    <!-- Main Race Component -->
    <div class="race-container">
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
import { ref, computed, onMounted } from 'vue'
import Race from '@/components/racing/Race.vue'

interface RacerData {
  name: string
  username: string
  progress: number
  wpm?: number
  wpmHistory?: number[]
}

// Reactive state
const currentWPM = ref(0)
const currentProgress = ref(0)
const wordsTyped = ref(0)
const startTime = ref<number | null>(null)
const elapsedTime = ref(0)
const showResults = ref(false)

// Timer
let timerInterval: ReturnType<typeof setInterval> | null = null

// Final stats for results
const finalStats = ref({
  wpm: 0,
  words: 0,
  time: '0:00'
})

// Computed properties
const formattedTime = computed(() => {
  const minutes = Math.floor(elapsedTime.value / 60)
  const seconds = elapsedTime.value % 60
  return `${minutes}:${seconds.toString().padStart(2, '0')}`
})

const performanceLevel = computed(() => {
  const wpm = finalStats.value.wpm
  if (wpm >= 60) return '🚀 Excepcional'
  if (wpm >= 40) return '⭐ Excelente'
  if (wpm >= 25) return '✅ Bom'
  if (wpm >= 15) return '📈 Regular'
  return '🎯 Iniciante'
})

// Methods
const handleRaceUpdate = (racer: RacerData) => {
  currentWPM.value = Math.round(racer.wpm || 0)
  currentProgress.value = Math.round(racer.progress)
  
  // Start timer on first update
  if (!startTime.value) {
    startTime.value = Date.now()
    startTimer()
  }
  
  // Count words (estimate based on progress)
  wordsTyped.value = Math.floor(currentProgress.value / 5) // Rough estimate
  
  // Check if race is complete
  if (currentProgress.value >= 100) {
    completeRace(racer)
  }
}

const startTimer = () => {
  timerInterval = setInterval(() => {
    if (startTime.value) {
      elapsedTime.value = Math.floor((Date.now() - startTime.value) / 1000)
    }
  }, 1000)
}

const stopTimer = () => {
  if (timerInterval) {
    clearInterval(timerInterval)
    timerInterval = null
  }
}

const completeRace = (racer: RacerData) => {
  stopTimer()
  
  finalStats.value = {
    wpm: Math.round(racer.wpm || 0),
    words: wordsTyped.value,
    time: formattedTime.value
  }
  
  showResults.value = true
}

const restartRace = () => {
  // Reset all stats
  currentWPM.value = 0
  currentProgress.value = 0
  wordsTyped.value = 0
  startTime.value = null
  elapsedTime.value = 0
  showResults.value = false
  
  // Stop timer if running
  stopTimer()
  
  // Reload the page to restart the race component
  window.location.reload()
}

const closeResults = () => {
  showResults.value = false
}

// Cleanup on unmount
onMounted(() => {
  return () => {
    stopTimer()
  }
})
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

.race-stats {
  margin-bottom: 2rem;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.stat-card {
  background: white;
  padding: 1.5rem;
  border-radius: 0.75rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  text-align: center;
  border: 2px solid #f3f4f6;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: #ace82c;
    transform: translateY(-2px);
  }
}

.stat-label {
  font-size: 0.875rem;
  color: #6b7280;
  margin-bottom: 0.5rem;
  font-weight: 600;
}

.stat-value {
  font-size: 2rem;
  font-weight: bold;
  color: #1f2937;
  margin: 0;
}

.race-container {
  background: white;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 10px 25px -3px rgba(0, 0, 0, 0.1);
  border: 2px solid #f3f4f6;
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

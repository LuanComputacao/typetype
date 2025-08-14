<template>
  <div class="race-container">
    <!-- Loading State -->
    <div v-if="raceStore.race.loading" class="run__loading-flag">
      <div>Loading text</div>
    </div>

    <!-- Pre-Race State with Semaphore -->
    <div v-else-if="!raceStore.race.started" class="pre-race">
      <div class="semaphore-container">
        <SemaphoreLights :counter="raceStore.semaphore.counter" :max-counter="5" />
      </div>
      <div class="countdown">
        <button @click="raceStore.startCountdown" class="start-btn" :disabled="raceStore.semaphore.countdownRunning">
          {{ raceStore.semaphore.countdownRunning ? `Iniciando em ${raceStore.semaphore.countdown}s` : 'Iniciar Corrida' }}
        </button>
      </div>
    </div>

    <!-- Race State -->
    <div v-else class="race-active">
      <!-- Speedometer -->
      <div class="speedometer-container">
        <SpeedometerDigital
          :velocity="raceStore.racer.wpm"
          :velocity-last-word="raceStore.racer.partialWPM"
        />
      </div>

      <!-- Race Track with Car -->
      <div class="racetrack-container">
        <RaceTrack
          :lanes="1"
          track-height="120px"
          :cars="[{
            variant: 1,
            position: raceStore.carPosition,
            lane: 1,
            speed: raceStore.carSpeed,
            direction: 'right',
            size: 'medium',
            color: 'blue'
          }]"
        />
      </div>
    </div>

    <!-- Text Display and Input -->
    <div class="typing-section">
      <QuoteBox
        :text="raceStore.typing.text"
        :typed="raceStore.typing.typed"
        :current-word="raceStore.typing.currentWord"
        :current-word-typed="raceStore.typing.currentWordTyped"
      />
      <TypeBox
        v-if="!raceStore.isTypingDone"
        :lock="raceStore.typing.inputLocked"
        :word="raceStore.typing.currentWordTyped"
        @input="handleTyping"
        @update="handleTyping"
      />
      <div v-else class="race-completed">
        <h2 class="text-2xl font-bold text-green-600">🎉 Corrida Finalizada!</h2>
        <p class="text-lg">Velocidade final: {{ Math.round(raceStore.racer.wpm) }} WPM</p>
        <p class="text-sm mt-2" :class="raceStore.performanceLevel.color">{{ raceStore.performanceLevel.level }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, watch } from 'vue'
import QuoteBox from '@/components/typing/QuoteBox.vue'
import TypeBox from '@/components/typing/TypeBox.vue'
import SemaphoreLights from '@/components/transit/SemaphoreLights.vue'
import SpeedometerDigital from '@/components/driver/SpeedometerDigital.vue'
import RaceTrack from '@/components/transit/RaceTrack.vue'
import { useRaceStore } from '@/stores/race'

interface RacerData {
  name: string
  username: string
  progress: number
  wpm?: number
  wpmHistory?: number[]
}

type EmitFunctions = {
  updateRacing: [racer: RacerData]
}

const emit = defineEmits<EmitFunctions>()

// Use the race store
const raceStore = useRaceStore()

// Methods
const handleTyping = (input: string) => {
  raceStore.updateTyping(input)
}

// Watch for race completion and emit update
watch(() => raceStore.racer, (newRacer) => {
  emit('updateRacing', {
    name: newRacer.name,
    username: newRacer.username,
    progress: newRacer.progress,
    wpm: newRacer.wpm,
    wpmHistory: newRacer.wpmHistory
  })
}, { deep: true })

// Initialize race on mount
onMounted(() => {
  raceStore.initializeRace()
})
</script>

<style lang="scss" scoped>
.race-container {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 1rem;
}

.run__loading-flag {
  text-align: center;
  padding: 2rem;
  font-size: 1.2rem;
  color: #6b7280;
}

.pre-race {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  padding: 2rem;
}

.semaphore-container {
  display: flex;
  justify-content: center;
}

.countdown {
  text-align: center;
}

.start-btn {
  background-color: #ace82c;
  color: white;
  border: none;
  padding: 1rem 2rem;
  font-size: 1.1rem;
  font-weight: 600;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover:not(:disabled) {
    background-color: #9bd327;
    transform: translateY(-2px);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
}

.race-active {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.speedometer-container {
  display: flex;
  justify-content: center;
  padding: 1rem;
  background: #f8fafc;
  border-radius: 1rem;
  border: 2px solid #e2e8f0;
}

.racetrack-container {
  background: #f1f5f9;
  padding: 1rem;
  border-radius: 1rem;
  border: 2px solid #cbd5e1;
}

.typing-section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.race-completed {
  text-align: center;
  padding: 2rem;
  background: #f0fdf4;
  border: 2px solid #86efac;
  border-radius: 1rem;

  h2 {
    margin-bottom: 0.5rem;
  }

  p {
    color: #166534;
  }
}

@media (max-width: 768px) {
  .race-container {
    padding: 0.5rem;
    gap: 1rem;
  }

  .speedometer-container,
  .racetrack-container {
    padding: 0.5rem;
  }
}
</style>

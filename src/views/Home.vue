<template>
  <div key="home" class="home m-8">
    <h1 class="text-4xl font-bold mb-8 text-center">Demonstração de Componentes</h1>
    <p class="text-lg mb-8 text-center text-gray-600">
      Esta página demonstra o funcionamento dos componentes de semáforo e carro com diferentes
      configurações
    </p>

    <!-- Semaphore Lights Demo -->
    <div class="mb-12">
      <h2 class="text-3xl font-semibold mb-6 text-green-600">🚦 Componente Semáforo</h2>
      <p class="text-gray-700 mb-4">
        O semáforo muda de cor automaticamente baseado no contador que vai de 0 a 5.
      </p>

      <div class="bg-gray-100 p-6 rounded-lg">
        <div class="flex items-center justify-center gap-8">
          <SemaphoreLights :counter="counter" :maxCounter="5" />
          <div class="text-center">
            <p class="text-lg font-medium">Contador: {{ counter }}/5</p>
            <p class="text-sm text-gray-600 mt-1">
              {{ counter <= 1 ? 'Vermelho' : counter <= 4 ? 'Amarelo' : 'Verde' }}
            </p>
          </div>
        </div>
      </div>

      <div class="mt-4 p-4 bg-blue-50 rounded-lg">
        <h3 class="font-medium text-blue-800">Como funciona:</h3>
        <ul class="list-disc list-inside text-blue-700 mt-2 space-y-1">
          <li>0-1: Luz vermelha (pare)</li>
          <li>2-4: Luz amarela (atenção)</li>
          <li>5: Luz verde (siga)</li>
        </ul>
      </div>
    </div>

    <!-- Car Components Demo -->
    <div class="mb-12">
      <h2 class="text-3xl font-semibold mb-6 text-blue-600">🚗 Componente Carro</h2>

      <!-- Car Variants -->
      <div class="mb-8">
        <h3 class="text-xl font-medium mb-4">Variantes de Carros</h3>
        <div class="flex gap-6 items-center flex-wrap justify-center bg-gray-100 p-6 rounded-lg">
          <div class="text-center">
            <Car :variant="1" size="small" :animated="true" />
            <p class="text-sm mt-2">Variant 1</p>
          </div>
          <div class="text-center">
            <Car :variant="2" size="small" :animated="true" />
            <p class="text-sm mt-2">Variant 2</p>
          </div>
          <div class="text-center">
            <Car :variant="3" size="small" :animated="true" />
            <p class="text-sm mt-2">Variant 3</p>
          </div>
          <div class="text-center">
            <Car :variant="4" size="small" :animated="true" />
            <p class="text-sm mt-2">Variant 4</p>
          </div>
        </div>
      </div>

      <!-- Car Sizes -->
      <div class="mb-8">
        <h3 class="text-xl font-medium mb-4">Tamanhos</h3>
        <div class="flex gap-8 items-end justify-center bg-gray-100 p-6 rounded-lg">
          <div class="text-center">
            <Car :variant="1" size="small" />
            <p class="text-sm mt-2">Small</p>
          </div>
          <div class="text-center">
            <Car :variant="1" size="medium" />
            <p class="text-sm mt-2">Medium</p>
          </div>
          <div class="text-center">
            <Car :variant="1" size="large" />
            <p class="text-sm mt-2">Large</p>
          </div>
        </div>
      </div>

      <!-- Car Directions -->
      <div class="mb-8">
        <h3 class="text-xl font-medium mb-4">Direções</h3>
        <div class="flex gap-8 items-center justify-center bg-gray-100 p-6 rounded-lg">
          <div class="text-center">
            <Car :variant="2" direction="left" size="medium" />
            <p class="text-sm mt-2">← Esquerda</p>
          </div>
          <div class="text-center">
            <Car :variant="2" direction="right" size="medium" />
            <p class="text-sm mt-2">Direita →</p>
          </div>
        </div>
      </div>

      <!-- Driving Animation -->
      <div class="mb-8">
        <h3 class="text-xl font-medium mb-4">Animação de Dirigir</h3>
        <div class="bg-gray-200 p-6 rounded-lg overflow-hidden relative" style="height: 120px">
          <Car :variant="3" :driving="true" size="small" />
        </div>
        <p class="text-sm text-gray-600 mt-2 text-center">
          O carro se move continuamente da esquerda para a direita
        </p>
      </div>

      <!-- Speed Effects -->
      <div class="mb-8">
        <h3 class="text-xl font-medium mb-4">🏎️ Efeitos de Velocidade</h3>
        <p class="text-gray-700 mb-4">
          Os carros têm efeitos visuais baseados na velocidade com fumaça que aumenta
          proporcionalmente.
        </p>

        <!-- Speed demonstrations -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Low speed -->
          <div class="bg-gray-50 p-4 rounded-lg border">
            <h4 class="text-lg font-medium mb-2">🐌 Velocidade Baixa (20/100)</h4>
            <div class="bg-white p-4 rounded-lg flex justify-center">
              <Car :variant="1" :speed="20" :min-speed="0" :max-speed="100" size="medium" />
            </div>
            <p class="text-sm text-gray-600 mt-2">✨ Fumaça sutil (1-2 partículas)</p>
            <p class="text-xs text-gray-500 mt-1">Motor irregular em baixa rotação</p>
          </div>

          <!-- Medium speed -->
          <div class="bg-gray-50 p-4 rounded-lg border">
            <h4 class="text-lg font-medium mb-2">🚗 Velocidade Média (50/100)</h4>
            <div class="bg-white p-4 rounded-lg flex justify-center">
              <Car :variant="2" :speed="50" :min-speed="0" :max-speed="100" size="medium" />
            </div>
            <p class="text-sm text-gray-600 mt-2">⚡ Fumaça média (3-4 partículas)</p>
            <p class="text-xs text-gray-500 mt-1">Motor se estabilizando</p>
          </div>

          <!-- High speed -->
          <div class="bg-gray-50 p-4 rounded-lg border">
            <h4 class="text-lg font-medium mb-2">🏃 Velocidade Alta (80/100)</h4>
            <div class="bg-white p-4 rounded-lg flex justify-center">
              <Car :variant="3" :speed="80" :min-speed="0" :max-speed="100" size="medium" />
            </div>
            <p class="text-sm text-gray-600 mt-2">💨 Fumaça densa (6-7 partículas)</p>
            <p class="text-xs text-gray-500 mt-1">Motor estável, maior esforço</p>
          </div>

          <!-- Maximum speed -->
          <div class="bg-gray-50 p-4 rounded-lg border">
            <h4 class="text-lg font-medium mb-2">🚀 Velocidade Máxima (100/100)</h4>
            <div class="bg-white p-4 rounded-lg flex justify-center">
              <Car :variant="4" :speed="100" :min-speed="0" :max-speed="100" size="medium" />
            </div>
            <p class="text-sm text-gray-600 mt-2">🔥 Fumaça intensa (8 partículas)</p>
            <p class="text-xs text-gray-500 mt-1">Máximo desempenho do motor</p>
          </div>
        </div>
      </div>

      <!-- Speed Effects Explanation -->
      <div class="bg-blue-50 p-6 rounded-lg">
        <h3 class="font-medium text-blue-800 mb-3">📋 Como Funcionam os Efeitos de Velocidade:</h3>
        <div class="text-blue-700">
          <h4 class="font-medium">💨 Fumaça (Diretamente Proporcional):</h4>
          <ul class="list-disc list-inside text-sm mt-1 space-y-1">
            <li>Velocidade baixa: Pouco esforço = pouca fumaça</li>
            <li>Velocidade alta: Muito esforço = muita fumaça</li>
            <li>Varia de 1-2 partículas até 8 partículas</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Race Track -->
    <div class="mb-8">
      <h3 class="text-xl font-medium mb-4">🏁 Pista de Corrida</h3>
      <p class="text-gray-700 mb-4">
        Pista horizontal de asfalto preto com padrão xadrez e separação pontilhada entre faixas.
        Os carros são posicionados por porcentagem na pista.
      </p>

      <!-- Demonstração básica -->
      <div class="mb-6">
        <h4 class="text-lg font-medium mb-2">Corrida de Demonstração</h4>
        <RaceTrack 
          :lanes="3"
          track-height="200px"
          :cars="[
            { variant: 1, position: 15, lane: 1, speed: 40, size: 'small' },
            { variant: 2, position: 35, lane: 2, speed: 60, size: 'small' },
            { variant: 3, position: 55, lane: 3, speed: 80, size: 'small' },
            { variant: 4, position: 75, lane: 1, speed: 100, size: 'small' }
          ]"
        />
        <p class="text-sm text-gray-600 mt-2">
          4 carros em 3 faixas com diferentes posições e velocidades
        </p>
      </div>

      <!-- Corrida mais complexa -->
      <div class="mb-6">
        <h4 class="text-lg font-medium mb-2">Corrida com 4 Faixas</h4>
        <RaceTrack 
          :lanes="4"
          track-height="250px"
          :cars="[
            { variant: 1, position: 10, lane: 1, speed: 30, direction: 'right' },
            { variant: 2, position: 25, lane: 2, speed: 50, direction: 'right' },
            { variant: 3, position: 45, lane: 3, speed: 70, direction: 'right' },
            { variant: 4, position: 60, lane: 4, speed: 90, direction: 'right' },
            { variant: 1, position: 80, lane: 2, speed: 20, direction: 'right' },
            { variant: 3, position: 90, lane: 1, speed: 40, direction: 'right' }
          ]"
        />
        <p class="text-sm text-gray-600 mt-2">
          6 carros em 4 faixas com diferentes estratégias de corrida
        </p>
      </div>

      <!-- Corrida animada -->
      <div class="mb-6">
        <h4 class="text-lg font-medium mb-2">Corrida Animada em Progresso</h4>
        <RaceTrack 
          :lanes="3"
          track-height="180px"
          :cars="animatedRaceCars"
        />
        <div class="flex gap-2 mt-2">
          <button 
            @click="startRace" 
            class="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm"
            :disabled="raceRunning"
          >
            🏁 Iniciar Corrida
          </button>
          <button 
            @click="resetRace" 
            class="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded text-sm"
          >
            🔄 Resetar
          </button>
        </div>
        <p class="text-sm text-gray-600 mt-1">
          Clique para ver os carros avançarem automaticamente na pista
        </p>
      </div>

      <!-- Características da pista -->
      <div class="bg-blue-50 p-4 rounded-lg">
        <h4 class="font-medium text-blue-800 mb-2">🔧 Características da Pista:</h4>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-blue-700 text-sm">
          <ul class="list-disc list-inside space-y-1">
            <li><strong>Asfalto:</strong> Preto com padrão xadrez sutil</li>
            <li><strong>Faixas:</strong> Separadas por linhas pontilhadas brancas</li>
            <li><strong>Linha de largada:</strong> Xadrez preto e branco com bandeira 🏁</li>
          </ul>
          <ul class="list-disc list-inside space-y-1">
            <li><strong>Posicionamento:</strong> Por porcentagem (0-100%)</li>
            <li><strong>Faixas configuráveis:</strong> 1 a N faixas</li>
            <li><strong>Carros:</strong> Automáticamente centralizados na faixa</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Technical Info -->
    <div class="bg-gray-100 p-6 rounded-lg">
      <h3 class="text-lg font-medium mb-3">⚙️ Informações Técnicas</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
        <div>
          <h4 class="font-medium">Semáforo:</h4>
          <ul class="list-disc list-inside mt-1 space-y-1">
            <li>Props: counter, maxCounter</li>
            <li>Mudança automática de cor</li>
            <li>Padrões de fundo animados</li>
          </ul>
        </div>
        <div>
          <h4 class="font-medium">Carro:</h4>
          <ul class="list-disc list-inside mt-1 space-y-1">
            <li>Props: variant, size, direction, speed</li>
            <li>4 variantes SVG diferentes</li>
            <li>Efeitos visuais dinâmicos</li>
            <li>Animações CSS personalizadas</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

import SemaphoreLights from '@/components/transit/SemaphoreLights.vue'
import Car from '@/components/Car.vue'
import RaceTrack from '@/components/transit/RaceTrack.vue'

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

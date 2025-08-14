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

      <!-- Car Colors -->
      <div class="mb-8">
        <h3 class="text-xl font-medium mb-4">🎨 Cores dos Carros</h3>

        <p class="text-gray-700 mb-4">
          Os carros suportam diferentes modos de colorização: filtro (hue-rotate), sobreposição e
          substituição.
        </p>

        <!-- Cores básicas com modo filter -->
        <div class="mb-6">
          <h4 class="text-lg font-medium mb-2">Cores Básicas (Modo Filter)</h4>
          <div class="flex gap-4 items-center justify-center bg-gray-100 p-6 rounded-lg flex-wrap">
            <div class="text-center">
              <Car :variant="1" size="small" />
              <p class="text-xs mt-1">Original</p>
            </div>
            <div class="text-center">
              <Car :variant="1" size="small" color="red" />
              <p class="text-xs mt-1">Vermelho</p>
            </div>
            <div class="text-center">
              <Car :variant="1" size="small" color="blue" />
              <p class="text-xs mt-1">Azul</p>
            </div>
            <div class="text-center">
              <Car :variant="1" size="small" color="green" />
              <p class="text-xs mt-1">Verde</p>
            </div>
            <div class="text-center">
              <Car :variant="1" size="small" color="yellow" />
              <p class="text-xs mt-1">Amarelo</p>
            </div>
            <div class="text-center">
              <Car :variant="1" size="small" color="purple" />
              <p class="text-xs mt-1">Roxo</p>
            </div>
            <div class="text-center">
              <Car :variant="1" size="small" color="orange" />
              <p class="text-xs mt-1">Laranja</p>
            </div>
          </div>
        </div>

        <!-- Cores com graus específicos -->
        <div class="mb-6">
          <h4 class="text-lg font-medium mb-2">Cores Personalizadas (Graus)</h4>
          <div class="flex gap-4 items-center justify-center bg-gray-100 p-6 rounded-lg flex-wrap">
            <div class="text-center">
              <Car :variant="2" size="small" color="45deg" />
              <p class="text-xs mt-1">45°</p>
            </div>
            <div class="text-center">
              <Car :variant="2" size="small" color="90deg" />
              <p class="text-xs mt-1">90°</p>
            </div>
            <div class="text-center">
              <Car :variant="2" size="small" color="180deg" />
              <p class="text-xs mt-1">180°</p>
            </div>
            <div class="text-center">
              <Car :variant="2" size="small" color="270deg" />
              <p class="text-xs mt-1">270°</p>
            </div>
          </div>
        </div>

        <!-- Diferentes modos de cor -->
        <div class="mb-6">
          <h4 class="text-lg font-medium mb-2">Modos de Colorização</h4>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div class="bg-gray-50 p-4 rounded-lg text-center">
              <Car :variant="3" size="medium" color="red" color-mode="filter" />
              <p class="text-sm font-medium mt-2">Modo Filter</p>
              <p class="text-xs text-gray-600">Hue-rotate padrão</p>
            </div>
            <div class="bg-gray-50 p-4 rounded-lg text-center">
              <Car :variant="3" size="medium" color="#ff4444" color-mode="overlay" />
              <p class="text-sm font-medium mt-2">Modo Overlay</p>
              <p class="text-xs text-gray-600">Sobreposição de cor</p>
            </div>
            <div class="bg-gray-50 p-4 rounded-lg text-center">
              <Car :variant="3" size="medium" color="blue" color-mode="replace" />
              <p class="text-sm font-medium mt-2">Modo Replace</p>
              <p class="text-xs text-gray-600">Substituição completa</p>
            </div>
          </div>
        </div>

        <!-- Cores aplicadas na corrida -->
        <div class="mb-6">
          <h4 class="text-lg font-medium mb-2">Carros Coloridos em Ação</h4>
          <div class="bg-gray-200 p-6 rounded-lg overflow-hidden relative" style="height: 120px">
            <Car
              :variant="1"
              :driving="true"
              size="small"
              color="red"
              style="animation-delay: 0s"
            />
            <Car
              :variant="2"
              :driving="true"
              size="small"
              color="blue"
              style="animation-delay: 0.5s"
            />
            <Car
              :variant="3"
              :driving="true"
              size="small"
              color="green"
              style="animation-delay: 1s"
            />
            <Car
              :variant="4"
              :driving="true"
              size="small"
              color="purple"
              style="animation-delay: 1.5s"
            />
          </div>
          <p class="text-sm text-gray-600 mt-2 text-center">
            Múltiplos carros coloridos se movendo com delays diferentes
          </p>
        </div>

        <!-- Explicação das cores -->
        <div class="bg-green-50 p-4 rounded-lg">
          <h4 class="font-medium text-green-800 mb-2">🎨 Modos de Colorização:</h4>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-green-700 text-sm">
            <div>
              <h5 class="font-medium">Filter Mode</h5>
              <ul class="list-disc list-inside mt-1 space-y-1">
                <li>Usa hue-rotate CSS</li>
                <li>Aceita cores nomeadas</li>
                <li>Aceita graus (0deg-360deg)</li>
                <li>Mantém brilho original</li>
              </ul>
            </div>
            <div>
              <h5 class="font-medium">Overlay Mode</h5>
              <ul class="list-disc list-inside mt-1 space-y-1">
                <li>Sobreposição de cor</li>
                <li>Aceita hex, rgb, rgba</li>
                <li>Usa mix-blend-mode</li>
                <li>Efeito mais sutil</li>
              </ul>
            </div>
            <div>
              <h5 class="font-medium">Replace Mode</h5>
              <ul class="list-disc list-inside mt-1 space-y-1">
                <li>Recoloração completa</li>
                <li>Usa filtros sepia+hue</li>
                <li>Cores mais vibrantes</li>
                <li>Resultado mais dramático</li>
              </ul>
            </div>
          </div>
        </div>
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
        Pista horizontal de asfalto preto com padrão xadrez e separação pontilhada entre faixas. Os
        carros são posicionados por porcentagem na pista.
      </p>

      <!-- Demonstração básica -->
      <div class="mb-6">
        <h4 class="text-lg font-medium mb-2">Corrida de Demonstração Colorida</h4>
        <RaceTrack
          :lanes="3"
          track-height="200px"
          :cars="[
            { variant: 1, position: 15, lane: 1, speed: 40, size: 'small', color: 'red' },
            { variant: 2, position: 35, lane: 2, speed: 60, size: 'small', color: 'blue' },
            { variant: 3, position: 55, lane: 3, speed: 80, size: 'small', color: 'green' },
            { variant: 4, position: 75, lane: 1, speed: 100, size: 'small', color: 'yellow' },
          ]"
        />
        <p class="text-sm text-gray-600 mt-2">
          4 carros coloridos em 3 faixas com diferentes posições e velocidades
        </p>
      </div>

      <!-- Corrida mais complexa -->
      <div class="mb-6">
        <h4 class="text-lg font-medium mb-2">Corrida com 4 Faixas e Cores Personalizadas</h4>
        <RaceTrack
          :lanes="4"
          track-height="250px"
          :cars="[
            { variant: 1, position: 10, lane: 1, speed: 30, direction: 'right', color: '45deg' },
            { variant: 2, position: 25, lane: 2, speed: 50, direction: 'right', color: 'purple' },
            { variant: 3, position: 45, lane: 3, speed: 70, direction: 'right', color: '#ff6b35' },
            { variant: 4, position: 60, lane: 4, speed: 90, direction: 'right', color: 'cyan' },
            { variant: 1, position: 80, lane: 2, speed: 20, direction: 'right', color: 'pink' },
            { variant: 3, position: 90, lane: 1, speed: 40, direction: 'right', color: '180deg' },
          ]"
        />
        <p class="text-sm text-gray-600 mt-2">6 carros com cores personalizadas em 4 faixas</p>
      </div>

      <!-- Corrida animada -->
      <div class="mb-6">
        <h4 class="text-lg font-medium mb-2">Corrida Animada em Progresso</h4>
        <RaceTrack :lanes="3" track-height="180px" :cars="animatedRaceCars" />
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

    <!-- Speedometer -->
    <div class="mb-12">
      <h2 class="text-3xl font-semibold mb-6 text-purple-600">📊 Componente Velocímetro Digital</h2>
      <p class="text-gray-700 mb-4">
        Velocímetro digital que mostra velocidade atual (w/m) com barra de progresso visual e LEDs.
      </p>

      <!-- Basic Speedometer Examples -->
      <div class="mb-8">
        <h3 class="text-xl font-medium mb-4">Diferentes Velocidades</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Low speed -->
          <div class="bg-gray-50 p-4 rounded-lg border">
            <h4 class="text-lg font-medium mb-3">🐌 Velocidade Baixa</h4>
            <div class="bg-white p-4 rounded-lg flex justify-center">
              <SpeedometerDigital :velocity="32" :velocity-last-word="28" />
            </div>
            <p class="text-sm text-gray-600 mt-2">32 w/m total, 28 w/m última palavra</p>
          </div>

          <!-- Medium speed -->
          <div class="bg-gray-50 p-4 rounded-lg border">
            <h4 class="text-lg font-medium mb-3">⚡ Velocidade Média</h4>
            <div class="bg-white p-4 rounded-lg flex justify-center">
              <SpeedometerDigital :velocity="85" :velocity-last-word="78" />
            </div>
            <p class="text-sm text-gray-600 mt-2">85 w/m total, 78 w/m última palavra</p>
          </div>

          <!-- High speed -->
          <div class="bg-gray-50 p-4 rounded-lg border">
            <h4 class="text-lg font-medium mb-3">🚀 Velocidade Alta</h4>
            <div class="bg-white p-4 rounded-lg flex justify-center">
              <SpeedometerDigital :velocity="156" :velocity-last-word="142" />
            </div>
            <p class="text-sm text-gray-600 mt-2">156 w/m total, 142 w/m última palavra</p>
          </div>

          <!-- Maximum speed -->
          <div class="bg-gray-50 p-4 rounded-lg border">
            <h4 class="text-lg font-medium mb-3">🔥 Velocidade Máxima</h4>
            <div class="bg-white p-4 rounded-lg flex justify-center">
              <SpeedometerDigital :velocity="256" :velocity-last-word="250" />
            </div>
            <p class="text-sm text-gray-600 mt-2">256 w/m total (máximo), 250 w/m última palavra</p>
          </div>
        </div>
      </div>

      <!-- Real-time Speedometer -->
      <div class="mb-8">
        <h3 class="text-xl font-medium mb-4">Velocímetro em Tempo Real</h3>
        <div class="bg-gray-50 p-6 rounded-lg border">
          <div class="bg-white p-4 rounded-lg flex justify-center mb-4">
            <SpeedometerDigital :velocity="realtimeSpeed" :velocity-last-word="realtimeLastWordSpeed" />
          </div>
          <div class="flex gap-2 justify-center">
            <button
              @click="startSpeedTest"
              class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded text-sm"
              :disabled="speedTestRunning"
            >
              🏃 Iniciar Teste de Velocidade
            </button>
            <button
              @click="stopSpeedTest"
              class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded text-sm"
            >
              ⏹️ Parar
            </button>
            <button
              @click="resetSpeedTest"
              class="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded text-sm"
            >
              🔄 Resetar
            </button>
          </div>
          <p class="text-sm text-gray-600 mt-2 text-center">
            Simula digitação em tempo real com velocidade variável
          </p>
        </div>
      </div>

      <!-- Speedometer Comparison -->
      <div class="mb-8">
        <h3 class="text-xl font-medium mb-4">Comparação de Velocidades</h3>
        <div class="bg-gray-50 p-6 rounded-lg border">
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div class="text-center">
              <h4 class="text-sm font-medium mb-2">Iniciante</h4>
              <SpeedometerDigital :velocity="25" :velocity-last-word="22" />
              <p class="text-xs text-gray-600 mt-1">25 w/m</p>
            </div>
            <div class="text-center">
              <h4 class="text-sm font-medium mb-2">Intermediário</h4>
              <SpeedometerDigital :velocity="65" :velocity-last-word="61" />
              <p class="text-xs text-gray-600 mt-1">65 w/m</p>
            </div>
            <div class="text-center">
              <h4 class="text-sm font-medium mb-2">Avançado</h4>
              <SpeedometerDigital :velocity="120" :velocity-last-word="115" />
              <p class="text-xs text-gray-600 mt-1">120 w/m</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Speedometer Features -->
      <div class="bg-purple-50 p-6 rounded-lg">
        <h3 class="font-medium text-purple-800 mb-3">⚙️ Características do Velocímetro:</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-purple-700 text-sm">
          <ul class="list-disc list-inside space-y-1">
            <li><strong>Barra de Progresso:</strong> Visual com LEDs verdes</li>
            <li><strong>Velocidade Atual:</strong> w/m da última palavra digitada</li>
            <li><strong>Velocidade Total:</strong> w/m média geral</li>
            <li><strong>Máximo:</strong> 256 w/m (palavras por minuto)</li>
          </ul>
          <ul class="list-disc list-inside space-y-1">
            <li><strong>Display Digital:</strong> Fonte monoespaçada</li>
            <li><strong>Cores:</strong> Verde para atual, amarelo para total</li>
            <li><strong>Responsivo:</strong> Adapta-se ao container</li>
            <li><strong>Tempo Real:</strong> Atualização dinâmica</li>
          </ul>
        </div>
      </div>
    </div>
    <!-- Technical Info -->
    <div class="bg-gray-100 p-6 rounded-lg">
      <h3 class="text-lg font-medium mb-3">⚙️ Informações Técnicas</h3>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-700">
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
            <li>Props de cor: color, colorMode</li>
            <li>4 variantes SVG diferentes</li>
            <li>Efeitos visuais dinâmicos</li>
            <li>Sistema de cores avançado</li>
            <li>Animações CSS personalizadas</li>
          </ul>
        </div>
        <div>
          <h4 class="font-medium">RaceTrack:</h4>
          <ul class="list-disc list-inside mt-1 space-y-1">
            <li>Props: cars, lanes, trackWidth, trackHeight</li>
            <li>Pista com asfalto e padrão xadrez</li>
            <li>Posicionamento por porcentagem</li>
            <li>Suporte a múltiplas faixas</li>
            <li>Carros coloridos integrados</li>
            <li>Animações de corrida</li>
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
import SpeedometerDigital from '@/components/driver/SpeedometerDigital.vue'

const counter = ref(0)
let intervalId: ReturnType<typeof setInterval> | null = null

// Corrida animada
const raceRunning = ref(false)
let raceIntervalId: ReturnType<typeof setInterval> | null = null

// Velocímetro em tempo real
const realtimeSpeed = ref(0)
const realtimeLastWordSpeed = ref(0)
const speedTestRunning = ref(false)
let speedTestIntervalId: ReturnType<typeof setInterval> | null = null

const animatedRaceCars = ref([
  {
    variant: 1 as const,
    position: 5,
    lane: 1,
    speed: 35,
    direction: 'right' as const,
    size: 'small' as const,
    color: 'red',
  },
  {
    variant: 2 as const,
    position: 5,
    lane: 2,
    speed: 45,
    direction: 'right' as const,
    size: 'small' as const,
    color: 'blue',
  },
  {
    variant: 3 as const,
    position: 5,
    lane: 3,
    speed: 55,
    direction: 'right' as const,
    size: 'small' as const,
    color: 'green',
  },
])

const startRace = () => {
  if (raceRunning.value) return

  raceRunning.value = true

  raceIntervalId = setInterval(() => {
    let allFinished = true

    animatedRaceCars.value.forEach((car) => {
      if (car.position < 95) {
        // Velocidade variável baseada na speed do carro
        const increment = (car.speed / 100) * 2 + Math.random() * 0.5
        car.position = Math.min(95, car.position + increment)
        allFinished = false
      }
    })

    // Para a corrida quando todos os carros terminam
    if (allFinished) {
      raceRunning.value = false
      if (raceIntervalId) {
        clearInterval(raceIntervalId)
        raceIntervalId = null
      }
    }
  }, 100)
}

const resetRace = () => {
  raceRunning.value = false
  if (raceIntervalId) {
    clearInterval(raceIntervalId)
    raceIntervalId = null
  }

  // Reset positions
  animatedRaceCars.value.forEach((car) => {
    car.position = 5
  })
}

// Funções do velocímetro
const startSpeedTest = () => {
  if (speedTestRunning.value) return

  speedTestRunning.value = true
  
  speedTestIntervalId = setInterval(() => {
    // Simula variação na velocidade de digitação
    const targetSpeed = 40 + Math.random() * 80 // 40-120 w/m
    const targetLastWord = targetSpeed + (Math.random() - 0.5) * 20 // Variação na última palavra
    
    // Suaviza a transição
    realtimeSpeed.value += (targetSpeed - realtimeSpeed.value) * 0.1
    realtimeLastWordSpeed.value += (Math.max(0, targetLastWord) - realtimeLastWordSpeed.value) * 0.15
  }, 100)
}

const stopSpeedTest = () => {
  speedTestRunning.value = false
  if (speedTestIntervalId) {
    clearInterval(speedTestIntervalId)
    speedTestIntervalId = null
  }
}

const resetSpeedTest = () => {
  stopSpeedTest()
  realtimeSpeed.value = 0
  realtimeLastWordSpeed.value = 0
}

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
  if (raceIntervalId) {
    clearInterval(raceIntervalId)
  }
  if (speedTestIntervalId) {
    clearInterval(speedTestIntervalId)
  }
})
</script>

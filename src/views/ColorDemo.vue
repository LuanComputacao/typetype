<template>
  <div class="demo-container">
    <h1>🚗 Demonstração: Técnica de Colorização SVG</h1>
    
    <div class="comparison">
      <!-- Técnica Antiga (img src) -->
      <div class="demo-section">
        <h2>❌ Técnica Antiga (img src)</h2>
        <div class="car-container old-technique">
          <img src="/src/assets/car_1.svg" alt="Carro" class="car-img" />
        </div>
        <p class="description">
          ❌ Cores não funcionam<br>
          🔧 SVG externo não herda CSS color
        </p>
      </div>

      <!-- Técnica Nova (v-html + raw) -->
      <div class="demo-section">
        <h2>✅ Técnica Nova (v-html + raw)</h2>
        <div class="car-container new-technique">
          <div class="car-svg" v-html="Car1"></div>
        </div>
        <p class="description">
          ✅ Cores funcionam perfeitamente<br>
          🎨 SVG inline herda CSS color
        </p>
      </div>
    </div>

    <!-- Exemplos de Cores -->
    <div class="color-examples">
      <h2>🌈 Exemplos de Cores</h2>
      <div class="color-grid">
        <div class="color-demo" style="color: red;">
          <div class="car-svg" v-html="Car1"></div>
          <span>Vermelho</span>
        </div>
        <div class="color-demo" style="color: blue;">
          <div class="car-svg" v-html="Car2"></div>
          <span>Azul</span>
        </div>
        <div class="color-demo" style="color: green;">
          <div class="car-svg" v-html="Car3"></div>
          <span>Verde</span>
        </div>
        <div class="color-demo" style="color: purple;">
          <div class="car-svg" v-html="Car4"></div>
          <span>Roxo</span>
        </div>
        <div class="color-demo" style="color: orange;">
          <div class="car-svg" v-html="Car1"></div>
          <span>Laranja</span>
        </div>
        <div class="color-demo" style="color: #ff1493;">
          <div class="car-svg" v-html="Car2"></div>
          <span>Rosa</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Car1 from '../assets/car_1.svg?raw'
import Car2 from '../assets/car_2.svg?raw'
import Car3 from '../assets/car_3.svg?raw'
import Car4 from '../assets/car_4.svg?raw'
</script>

<style scoped lang="scss">
.demo-container {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
  background: #f8fafc;
  min-height: 100vh;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

h1 {
  text-align: center;
  margin-bottom: 40px;
  color: #1a202c;
  font-size: 2.5rem;
}

h2 {
  margin-bottom: 20px;
  color: #2d3748;
  font-size: 1.5rem;
}

.comparison {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  margin-bottom: 50px;
}

.demo-section {
  background: white;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.car-container {
  margin: 20px 0;
  padding: 20px;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 120px;
}

.old-technique {
  background: #fed7d7;
  color: red; /* Esta cor não será aplicada ao SVG */
}

.new-technique {
  background: #c6f6d5;
  color: red; /* Esta cor SERÁ aplicada ao SVG */
}

.car-img {
  width: 80px;
  height: auto;
}

.car-svg {
  width: 80px;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;

  :deep(svg) {
    width: 100%;
    height: auto;
  }
}

.description {
  margin-top: 15px;
  font-size: 14px;
  line-height: 1.5;
  color: #4a5568;
}

.color-examples {
  background: white;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.color-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.color-demo {
  text-align: center;
  padding: 20px;
  background: #f7fafc;
  border-radius: 8px;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-4px);
  }

  .car-svg {
    width: 60px;
    margin: 0 auto 10px;
  }

  span {
    display: block;
    font-weight: 600;
    color: #2d3748;
  }
}

@media (max-width: 768px) {
  .comparison {
    grid-template-columns: 1fr;
    gap: 20px;
  }
  
  h1 {
    font-size: 2rem;
  }
}
</style>

<template>
  <div class="race-track">
    <!-- Pista principal -->
    <div class="race-track__road">
      <!-- Faixas da pista -->
      <div 
        v-for="lane in lanes" 
        :key="`lane-${lane}`" 
        class="race-track__lane"
        :class="`race-track__lane--${lane}`"
      >
        <!-- Linha divisória pontilhada (exceto na última faixa) -->
        <div 
          v-if="lane < lanes" 
          class="race-track__divider"
        ></div>
      </div>

      <!-- Carros na pista -->
      <div
        v-for="(car, index) in cars"
        :key="`car-${index}`"
        class="race-track__car"
        :style="getCarPosition(car, index)"
      >
        <Car
          :variant="car.variant"
          :size="car.size || 'small'"
          :color="car.color"
          :direction="car.direction || 'right'"
          :animated="car.animated"
          :driving="car.driving"
          :speed="car.speed"
          :min-speed="car.minSpeed || 0"
          :max-speed="car.maxSpeed || 100"
        />
      </div>
    </div>

    <!-- Linha de largada/chegada -->
    <div class="race-track__finish-line"></div>
  </div>
</template>

<script setup lang="ts">
import Car from '@/components/Car.vue'

interface RaceCarProps {
  variant?: 1 | 2 | 3 | 4
  size?: 'small' | 'medium' | 'large'
  color?: string
  direction?: 'left' | 'right'
  animated?: boolean
  driving?: boolean
  speed?: number
  minSpeed?: number
  maxSpeed?: number
  position?: number // Posição em porcentagem (0-100)
  lane?: number // Faixa da pista (1-N)
}

interface Props {
  cars?: RaceCarProps[]
  lanes?: number // Número de faixas da pista
  trackWidth?: string
  trackHeight?: string
}

const props = withDefaults(defineProps<Props>(), {
  cars: () => [],
  lanes: 3,
  trackWidth: '100%',
  trackHeight: '300px',
})

// Calcula a posição do carro na pista
const getCarPosition = (car: RaceCarProps, index: number) => {
  const position = car.position || 0 // Posição horizontal em %
  const lane = car.lane || (index % props.lanes) + 1 // Faixa automática se não especificada
  
  // Calcula a posição vertical baseada na faixa
  const laneHeight = 100 / props.lanes
  const laneCenter = (lane - 1) * laneHeight + laneHeight / 2
  
  return {
    left: `${position}%`,
    top: `${laneCenter}%`,
    transform: 'translate(-50%, -50%)',
    position: 'absolute' as const,
    zIndex: 10,
  }
}
</script>

<style lang="scss">
.race-track {
  position: relative;
  width: v-bind('props.trackWidth');
  height: v-bind('props.trackHeight');
  border: 3px solid #333;
  border-radius: 8px;
  overflow: hidden;
  background: #2a5934; // Grama nas laterais

  &__road {
    position: relative;
    width: 100%;
    height: 100%;
    background: #1a1a1a; // Asfalto preto base
    
    // Padrão xadrez sutil no asfalto
    background-image: 
      linear-gradient(45deg, #222 25%, transparent 25%),
      linear-gradient(-45deg, #222 25%, transparent 25%),
      linear-gradient(45deg, transparent 75%, #222 75%),
      linear-gradient(-45deg, transparent 75%, #222 75%);
    background-size: 20px 20px;
    background-position: 0 0, 0 10px, 10px -10px, -10px 0px;
  }

  &__lane {
    position: absolute;
    width: 100%;
    height: calc(100% / v-bind('props.lanes'));
    
    // Posicionamento das faixas
    @for $i from 1 through 10 {
      &--#{$i} {
        top: calc((#{$i - 1}) * (100% / v-bind('props.lanes')));
      }
    }
  }

  &__divider {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background: repeating-linear-gradient(
      to right,
      white 0,
      white 20px,
      transparent 20px,
      transparent 40px
    );
    opacity: 0.8;
  }

  &__car {
    position: absolute;
    transition: all 0.3s ease;
  }

  &__finish-line {
    position: absolute;
    left: 5%;
    top: 0;
    width: 4px;
    height: 100%;
    background: repeating-linear-gradient(
      to bottom,
      white 0,
      white 15px,
      #000 15px,
      #000 30px
    );
    z-index: 5;
    
    &::before {
      content: '🏁';
      position: absolute;
      top: -25px;
      left: 50%;
      transform: translateX(-50%);
      font-size: 20px;
      background: white;
      padding: 2px 4px;
      border-radius: 4px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.3);
    }
  }
}
</style>

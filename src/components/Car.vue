<template>
  <div class="car" :class="carClasses" :style="carStyles">
    <!-- Smoke effect for any speed above minimum -->
    <div v-if="props.speed > props.minSpeed" class="car__smoke">
      <div
        v-for="(particle, index) in smokeParticles"
        :key="`particle-${index}`"
        class="smoke-particle"
        :class="`smoke-particle--${index + 1}`"
        :style="particle.style"
      ></div>
    </div>

    <img :src="carSvg" :alt="`Car variant ${variant}`" class="car__image" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  variant?: 1 | 2 | 3 | 4
  size?: 'small' | 'medium' | 'large' | 'custom'
  color?: string
  direction?: 'left' | 'right'
  animated?: boolean
  driving?: boolean
  speed?: number
  minSpeed?: number
  maxSpeed?: number
  width?: string
  height?: string
}

const props = withDefaults(defineProps<Props>(), {
  variant: 1,
  size: 'medium',
  direction: 'right',
  animated: false,
  driving: false,
  speed: 0,
  minSpeed: 0,
  maxSpeed: 100,
})

// TODO: replace with pinia controller

// Calculate speed percentage (0-1)
const speedPercentage = computed(() => {
  if (props.speed <= props.minSpeed) return 0
  if (props.speed >= props.maxSpeed) return 1
  return (props.speed - props.minSpeed) / (props.maxSpeed - props.minSpeed)
})

// Determine if speed is high enough for smoke effect (starts at 20% speed)
const isHighSpeed = computed(() => speedPercentage.value > 0.2)

// Generate smoke particles based on speed
const smokeParticles = computed(() => {
  // Se não há velocidade, não há fumaça
  if (props.speed <= props.minSpeed) return []
  
  // Ajusta a quantidade de partículas baseado na velocidade
  // Velocidade mínima = 1 partícula, 100% velocidade = 8 partículas
  const minParticles = 1
  const maxParticles = 8
  const particleCount = Math.ceil(
    minParticles + speedPercentage.value * (maxParticles - minParticles)
  )

  const particles = []
  for (let i = 0; i < particleCount; i++) {
    const delay = (i * 0.15) % 1.2 // Stagger animation delays
    const offsetX = Math.random() * 10 - 5 // Random horizontal offset
    const offsetY = Math.random() * 10 - 5 // Random vertical offset
    // Tamanho das partículas varia com a velocidade
    const baseSize = 4 + speedPercentage.value * 4 // 4-8px baseado na velocidade
    const size = baseSize + Math.random() * 2 // Adiciona variação aleatória

    particles.push({
      style: {
        '--animation-delay': `${delay}s`,
        '--offset-x': `${offsetX}px`,
        '--offset-y': `${offsetY}px`,
        '--particle-size': `${size}px`,
        animationDelay: `${delay}s`,
        right: `${offsetX}px`,
        top: `${offsetY}px`,
        width: `${size}px`,
        height: `${size}px`,
      },
    })
  }

  return particles
})

// Car SVG selection based on variant using dynamic imports
const carSvg = computed(() => {
  switch (props.variant) {
    case 1:
      return '/src/assets/car_1.svg'
    case 2:
      return '/src/assets/car_2.svg'
    case 3:
      return '/src/assets/car_3.svg'
    case 4:
      return '/src/assets/car_4.svg'
    default:
      return '/src/assets/car_1.svg'
  }
})

// Dynamic classes
const carClasses = computed(() => [
  `car--${props.size}`,
  `car--${props.direction}`,
  {
    'car--animated': props.animated,
    'car--driving': props.driving,
    'car--high-speed': isHighSpeed.value,
  },
])

// Dynamic styles
const carStyles = computed(() => ({
  ...(props.color && { filter: `hue-rotate(${props.color})` }),
  ...(props.width && { width: props.width }),
  ...(props.height && { height: props.height }),
  ...(props.speed > props.minSpeed && {
    '--speed-percentage': speedPercentage.value,
  }),
}))
</script>

<style lang="scss">
.car {
  // Size variables
  $car-small: 60px;
  $car-medium: 120px;
  $car-large: 180px;

  display: inline-block;
  position: relative;
  transition: transform 0.3s ease;

  &__smoke {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    pointer-events: none;
    z-index: 1;
  }

  &__image {
    display: block;
    width: 100%;
    height: auto;
    object-fit: contain;
    position: relative;
    z-index: 2;
  }

  // Size variants
  &--small {
    width: $car-small;

    .car__image {
      max-width: $car-small;
    }
  }

  &--medium {
    width: $car-medium;

    .car__image {
      max-width: $car-medium;
    }
  }

  &--large {
    width: $car-large;

    .car__image {
      max-width: $car-large;
    }
  }

  &--custom {
    width: auto;
  }

  // Direction variants
  &--left {
    .car__image {
      transform: scaleX(-1);
    }

    .car__smoke {
      right: -10px; // Fumaça sai da traseira (lado direito quando virado para esquerda)
    }

    // Smoke animation for left direction (smoke goes right/behind)
    .smoke-particle {
      animation: smoke-left 0.8s ease-out infinite;
      left: var(--offset-x, 0px);
      right: auto;
    }
  }

  &--right {
    .car__image {
      transform: scaleX(1);
    }

    .car__smoke {
      left: -10px; // Fumaça sai da traseira (lado esquerdo quando virado para direita)
    }

    // Smoke animation for right direction (smoke goes left/behind)
    .smoke-particle {
      animation: smoke-right 0.8s ease-out infinite;
    }
  }

  // Animation
  &--animated {
    &:hover {
      transform: translateY(-2px);
    }

    .car__image {
      transition: transform 0.3s ease;
    }
  }

  // Add driving animation
  &--driving {
    animation: drive 3s linear infinite;
  }

  // High speed effects
  &--high-speed {
    .car__image {
      filter: blur(0.5px);
    }
  }
}

// Smoke particles
.smoke-particle {
  position: absolute;
  width: var(--particle-size, 8px);
  height: var(--particle-size, 8px);
  background: radial-gradient(
    circle,
    rgba(128, 128, 128, calc(0.5 + var(--speed-percentage, 0.2) * 0.3)),
    transparent
  );
  border-radius: 50%;
  right: var(--offset-x, 0px);
  top: var(--offset-y, 0px);
}

@keyframes smoke {
  0% {
    opacity: 0.6;
    transform: translateX(0) translateY(0) scale(0.5);
  }
  100% {
    opacity: 0;
    transform: translateX(-20px) translateY(-10px) scale(1.5);
  }
}

@keyframes smoke-right {
  0% {
    opacity: calc(0.3 + var(--speed-percentage, 0.5) * 0.4);
    transform: translateX(0) translateY(0) scale(0.5);
  }
  100% {
    opacity: 0;
    transform: translateX(calc(-15px * var(--speed-percentage, 1)))
      translateY(calc(-10px * var(--speed-percentage, 1)))
      scale(calc(1 + var(--speed-percentage, 0.5)));
  }
}

@keyframes smoke-left {
  0% {
    opacity: calc(0.3 + var(--speed-percentage, 0.5) * 0.4);
    transform: translateX(0) translateY(0) scale(0.5);
  }
  100% {
    opacity: 0;
    transform: translateX(calc(15px * var(--speed-percentage, 1)))
      translateY(calc(-10px * var(--speed-percentage, 1)))
      scale(calc(1 + var(--speed-percentage, 0.5)));
  }
}

@keyframes drive {
  0% {
    transform: translateX(-100px);
  }
  100% {
    transform: translateX(100vw);
  }
}
</style>


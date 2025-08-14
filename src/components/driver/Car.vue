<template>
  <div class="car" :class="carClasses" :style="carStyles">
    <!-- Smoke effect for any speed above minimum -->
    <div v-if="props.speed > props.minSpeed" class="car__smoke">
      <img v-if="props.lowRes" src="@/assets/smoke.gif" alt="Smoke effect" class="car__smoke-gif"
      :style="{ opacity: smokeGifTransparency }"
      />
      <div
        v-else
        v-for="(particle, index) in smokeParticles"
        :key="`particle-${index}`"
        class="smoke-particle"
        :class="`smoke-particle--${index + 1}`"
        :style="particle.style"
      ></div>
    </div>

    <div v-else class="car__smoke"></div>

    <div class="car__shadow"></div>

    <div class="car__svg" v-html="carSvgContent"></div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

// Import SVGs as raw strings for direct manipulation
import Car1Svg from '@/assets/car_1.svg?raw'
import Car2Svg from '@/assets/car_2.svg?raw'
import Car3Svg from '@/assets/car_3.svg?raw'
import Car4Svg from '@/assets/car_4.svg?raw'

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
  lowRes?: boolean
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
  lowRes: true
})

// Simplified color application - just set CSS color property
const getColorStyles = (color?: string): Record<string, string> => {
  if (!color) return {}

  // With SVG raw import, we can directly set the color
  return {
    color: color,
  }
}

// Calculate speed percentage (0-1)
const speedPercentage = computed(() => {
  if (props.speed <= props.minSpeed) return 0
  if (props.speed >= props.maxSpeed) return 1
  return (props.speed - props.minSpeed) / (props.maxSpeed - props.minSpeed)
})

// Determine if speed is high enough for smoke effect (starts at 20% speed)
const isHighSpeed = computed(() => speedPercentage.value > 0.2)

const smokeGifTransparency = computed(() => {
  // Opacity varies from 0.3 at 20% speed to 1.0 at 100% speed
  if (speedPercentage.value <= 0.2) return 0
  return 0.3 + (speedPercentage.value - 0.2) * (0.7 / 0.8)
})

// Generate smoke particles based on speed
const smokeParticles = computed(() => {

  // Ajusta a quantidade de partículas baseado na velocidade
  // Velocidade mínima = 1 partícula, 100% velocidade = 8 partículas
  const minParticles = 3
  const maxParticles = 10
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

// Car SVG content selection based on variant using raw imports
const carSvgContent = computed(() => {
  switch (props.variant) {
    case 1:
      return Car1Svg
    case 2:
      return Car2Svg
    case 3:
      return Car3Svg
    case 4:
      return Car4Svg
    default:
      return Car1Svg
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
  ...getColorStyles(props.color),
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

  &__svg {
    display: block;
    width: 100%;
    height: auto;
    position: relative;
    z-index: 2;

    // Ensure SVG scales properly
    svg {
      width: 100%;
      height: auto;
      display: block;
    }
  }

  &__shadow {
    position: absolute;
    bottom: -6px;
    left: 50%;
    transform: translateX(-50%);
    width: 85%;
    height: 15px;
    background: radial-gradient(ellipse, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.15) 50%, rgba(0, 0, 0, 0.05) 75%, transparent 100%);
    border-radius: 50%;
    z-index: 1;
    transition: all 0.3s ease;
  }

  // Size variants
  &--small {
    width: $car-small;

    .car__svg {
      max-width: $car-small;
    }
  }

  &--medium {
    width: $car-medium;

    .car__svg {
      max-width: $car-medium;
    }
  }

  &--large {
    width: $car-large;

    .car__svg {
      max-width: $car-large;
    }
  }

  &--custom {
    width: auto;
  }

  // Direction variants
  &--left {
    .car__svg {
      transform: scaleX(-1);
    }

    .car__smoke-gif {
      // right: -100px;
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
    .car__svg {
      transform: scaleX(1);
    }

    .car__smoke-gif {
      left: -80%;
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

      .car__shadow {
        transform: translateX(-50%) scaleX(0.9);
        opacity: 0.7;
      }
    }

    .car__svg {
      transition: transform 0.3s ease;
    }
  }

  // Add driving animation
  &--driving {
    animation: drive 3s linear infinite;

    .car__shadow {
      animation: shadow-drive 3s linear infinite;
    }
  }

  // High speed effects
  &--high-speed {
    .car__svg {
      filter: blur(0.5px);
    }

    .car__shadow {
      transform: translateX(-50%) scaleX(1.2);
      opacity: 0.5;
    }
  }

  &__smoke-gif {
    transform: rotate(-20deg);
    width: 100%;
    height: auto;
    position: relative;
    top: 50%;
  }
}

// Smoke particles
.smoke-particle {
  $color-exa: 70;

  position: absolute;
  width: var(--particle-size, 8px);
  height: var(--particle-size, 8px);
  background: radial-gradient(
    circle,
    rgba($color-exa, $color-exa, $color-exa, calc(0.5 + var(--speed-percentage, 0.2) * 0.3)),
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

@keyframes shadow-drive {
  0% {
    transform: translateX(-50%) scaleX(0.8);
    opacity: 0.3;
  }
  50% {
    transform: translateX(-50%) scaleX(1.1);
    opacity: 0.4;
  }
  100% {
    transform: translateX(-50%) scaleX(0.8);
    opacity: 0.3;
  }
}
</style>


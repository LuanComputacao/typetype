<template>
  <div class="car">
    <div class="car__model">
    </div>
    <div class="car__glasses" :class="getGlassesClass()">
    </div>
  </div>
</template>

<script>
export default {
  name: 'RacingCar',

  props: {
    carModel: {
      type: String,
      required: false
    },

    carWidth: {
      type: Number,
      default: 30
    },

    carLane: {
      type: Number,
      required: true
    }
  },

  methods: {
    getGlassesClass () {
      return 'car__glasses--' + this.carLane
    }
  }
}
</script>

<style lang="scss" scoped>

$car-width: 30;
$car-heigth: 15;

$s-min: 50;
$s-max: 100;
$l-min: 30;
$l-max: 60;

@for $i from 1 through 9 {
  .car__glasses--#{$i} {
    background-color: hsl(random(360),$s-min+random($s-max+-$s-min),$l-min+random($l-max+-$l-min));
  }
}

.car{
  height: $car-heigth*1px;
  border-radius: 1px 3px 3px 1px;
  box-shadow: 13px 0px 17px 1px $white-light, -16px 0 11px -1px $red-on;
  position: relative;
  transition: left 2s;
  transition-timing-function: ease-out;
  width: $car-width*1px;

  &__glasses{
    height: ($car-heigth*4px)/5;
    width: ($car-width*2px)/3;
    position: absolute;
    top: 2px;
    left: 4px;
    z-index: 1;
  }

  &__model{
    background:center url("~@/assets/car2.png") no-repeat;
    background-size: $car-width*1px $car-heigth*1px;
    height: $car-heigth*1px;
    width: $car-width*1px;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
  }

  &--on{
    box-shadow: 26px 0px 17px 7px $white-light, -16px 0 11px 2px $red-on;
  }
}
</style>

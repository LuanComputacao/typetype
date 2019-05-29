<template>
  <div class="speedometer">
    <div class="velocity">
    <div class="velocity-bar">
      <div class="velocity-bar__on" :style="{width: velocityBarOn + '%'}">
        <div class="velocity-bar__led" v-for="i in (velocityBarOn/2)" :key="i">

        </div>
      </div>
      <div class="velocity-bar__off" :style="{width: (100 - velocityBarOn) + '%'}"></div>
    </div>
      <div class="velocity__current">
        <span class="velocity__numbers">{{ velocityLastWord.toFixed(2) }}</span>
        <span class="velocity__letters"> w/m</span>
      </div>
      <div class="velocity__total">
        <span class="velocity__numbers">{{ velocity.toFixed(2) }}</span>
        <span class="velocity__letters"> w/m</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SpeedometerDigital',

  props: {
    velocity: {
      type: Number,
      required: true
    },
    velocityLastWord: {
      type: Number,
      required: true
    }
  },

  computed: {
    hightVelocity () {
      return 256
    },
    velocityBarOn () {
      return ((this.velocityLastWord * 100) / this.hightVelocity).toFixed(0)
      // return (60).toFixed(0)
    }
  }
}
</script>

<style lang="scss" scoped>
$bar-width: 256px;
$bar-height: 20px;

.speedometer{
  padding: 10px;
  display: flex;
  border: solid 1px $green-on;
  background-color: $grey-panel-on;
  justify-content: center;
}

.velocity-bar{
  width: $bar-width;
  display: flex;

  &__on{
    background-color: $green-on;
    height: $bar-height;
    display: flex;
    flex-direction: row;
  }

  &__off{
    background-color: $green-off;
    height: $bar-height;
  }

  &__led{
    width: 3px;
    height: $bar-height;
    border-right: solid 2px $grey-panel-on;
  }
  }

.velocity{
  &__current{
    color: $green-on;
    font-size: 2.5em;
  }
  &__total{
    color: $yellow-on;
    font-size: 1.5em;
  }
  &__numbers{
    font-family:'digital_display', Sans-Serif;
    font-size: 1em;
  }
  &__letters{
    text-transform: uppercase;
    font-size: 0.5em;
  }
}

</style>

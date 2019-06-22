<template>
    <div class="racing-tracker">
        <SpeedometerDigital :velocity="me.wpm" :velocity-last-word="velocityLastWord"></SpeedometerDigital>
        <div class="runners-progress">
          <div class="racer" v-for="(racer, key) in allRacers" :key="key">
            <div class="racer__description">
                <div>{{racer.name}}</div>
                <div class="racer__username">({{racer.username}})</div>
              </div>
              <div class="racer__way" >
                <div class="way__runnable-path" :class="{'way__runnable-path--track': (key + 1) < allRacers.length}" >{{key}}</div>
                <div class="racer__car" :style="{left: racer.progress + '%' }">
                  <RacingCar :carLane="key+1"/>
                </div>
              </div>
              <div class="racer__stop"/>
          </div>
        </div>
    </div>
</template>

<script>
import SpeedometerDigital from '@/components/for-racing/SpeedometerDigital.vue'
import RacingCar from '@/components/for-racing/RacingCar.vue'

export default {
  name: 'RacingTracker',

  components: {
    SpeedometerDigital,
    RacingCar
  },

  props: {
    me: {
      type: Object,
      required: true,
      default: () => {}
    },
    racers: {
      type: Array,
      required: true
    }
  },

  computed: {
    allRacers () {
      let racers = [this.me]
      return racers.concat(this.racers)
    },
    velocityLastWord () {
      return this.me.wpmHistory.slice(-1)[0] || 0
    }
  }
}
</script>

<style lang="scss" scoped>

$description-width: 100;
$racer-width: 600;
$car-width: 30;
$car-heigth: 15;
$way-height: 32;
$end-start-width: 2;

.racing-tracker{
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
}

.runners-progress{
  display: flex;
  flex-direction: column;
}

.racer{
  display: flex;
  flex-direction: row;
  width: $racer-width*1px;

  @include pattern-carbon($size: 0.5, $lighten: 15%);

  &__car{
    position: relative;
    transition: left 2s;
    transition-timing-function: ease-out;

    &--on{
      box-shadow: 26px 0px 17px 7px $white-light, -16px 0 11px 2px $red-on;
    }
  }

  &__description{
    border-right: solid 2px $white-light;
    color: $white-light;
    width: $description-width*1px;
  }

  &__stop{
    width: $car-width*1.5px;
  }

  &__way{
    align-items: center;
    display: flex;
    width: $racer-width - $description-width * 1px;
    padding: 4px 0 4px 0;
    position: relative;
  }
}

.way{
  &__runnable-path{
    border-style: dashed;
    border-color: $white-light;
    border-left-width: $end-start-width*1px;
    border-right-width: $end-start-width*1px;
    border-top-width: 0;
    border-bottom-width: 0;
    height: $way-height*1px;
    width: $racer-width - $description-width - ($car-width*2.5)  * 1px;
    position: absolute;
    left: $car-width * 1px;

    &--track{
      border-bottom-width: $end-start-width * 0.5px;
    }
  }
}
</style>

<template>
    <div class="racing-tracker">
        <SpeedometerDigital :velocity="me.wpm" :velocity-last-word="velocityLastWord"></SpeedometerDigital>
        <div class="runners-progress">
          <div class="racer" v-for="(racer, key) in allRacers" :key="key">
            <div class="racer__description">
                <div>{{racer.name}}</div>
                <div class="racer__username">({{racer.username}})</div>
              </div>
              <div class="racer__way">
                <div class="racer__car" :style="{left: racer.progress + '%' }">
                  <RacingCar :carLane="key+1"/>
                </div>
              </div>
              <div class="racer__stop"/>>
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

$car-width: 30;
$car-heigth: 15;

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
  width: 50%;
}

.racer{
  display: flex;
  flex-direction: row;

  @include pattern-carbon($size: 0.5, $lighten: 15%);

  &__car{
    //  height: $car-heigth*1px;
    //  width: $car-width*1px;
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
    width: 100px;
  }

  &__stop{
    border-left: solid 2px $white-light;
    width: 10px;
  }

  &__way{
    align-items: center;
    display: flex;
    width: 100%;
    padding: 4px 30px 4px 30px;
  }
}
</style>

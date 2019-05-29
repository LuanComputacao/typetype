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
                <div class="racer__car" :style="{left: racer.progress + '%' }"/>
              </div>
              <div class="racer__stop"/>>
          </div>
        </div>
    </div>
</template>

<script>
import SpeedometerDigital from '@/components/for-racing/SpeedometerDigital.vue'

export default {
  name: 'RacingTracker',

  components: {
    SpeedometerDigital
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
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.runners-progress{
  width: 50%;
  display: flex;
  flex-direction: column;
}

.racer{
  display: flex;
  flex-direction: row;

  @include pattern-carbon($size: 0.5, $lighten: 15%);

  &__car{
    height: $car-heigth*1px;
    width: $car-width*1px;
    background-color: black;
    border-radius: 1px 3px 3px 1px;
    position: relative;
    box-shadow: 13px 0px 17px 1px $white-light, -16px 0 11px -1px $red-on;
    transition: left 2s;
    transition-timing-function: ease-out;

    &--on{
      box-shadow: 26px 0px 17px 7px $white-light, -16px 0 11px 2px $red-on;
    }
  }

  &__description{
    width: 100px;
    color: $white-light;
    border-right: solid 2px $white-light;
  }

  &__stop{
    width: 10px;
    border-left: solid 2px $white-light;
  }

  &__way{
    width: 100%;
    padding: 4px 30px 4px 30px;
    display: flex;
    align-items: center;
  }
}
</style>

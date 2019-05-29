<template>
  <div class="count-down">
    <div class="count-down__counter">
      {{counter}} of {{time}}
    </div>
    <div class="count-down__semaphore" :class="{'count-down__semaphore--red': isRed, 'count-down__semaphore--yellow': isYellow, 'count-down__semaphore--green': isGreen}">
      <div class="semaphore__light semaphore__light__red" :class="{'semaphore__light__red--on': isRed, 'semaphore__light__red--off': !isRed}"></div>
      <div class="semaphore__light semaphore__light__yellow" :class="{'semaphore__light__yellow--on': isYellow, 'semaphore__light__yellow--off': !isYellow}"></div>
      <div class="semaphore__light semaphore__light__green" :class="{'semaphore__light__green--on': isGreen, 'semaphore__light__green--off': !isGreen}"></div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'CountDown',
  props: {
    time: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      counter: 4,
      countDownInterval: null
    }
  },
  computed: {
    isRed () {
      return this.counter > (this.time / 2)
    },
    isYellow () {
      return this.counter <= (this.time / 2) && (this.counter >= 1)
    },
    isGreen () {
      return this.counter < 1
    }
  },

  mounted () {
    this.startCountdown()
  },

  methods: {
    startCountdown () {
      this.counter = this.time
      this.countDownInterval = setInterval(
        () => { this.counter -= 1 },
        1000
      )
      setTimeout(
        () => {
          clearInterval(this.countDownInterval)
          this.riseDone()
        },
        (this.time + 1) * 1000
      )
    },

    riseDone () {
      this.$emit('done')
    }
  }
}
</script>

<style lang="scss" scoped>

$diameter: 20px;

.count-down{

  &__counter{
    font-size: 18px;
  }

  &__semaphore{
    border-width: 1px;
    border-style: solid;
    margin: auto;
    padding: 10px;
    background-color: $grey-panel-on;
    display: inline-block;
    outline-width: 2px;
    outline-style: solid;
    outline-offset: 0px;

    &--red{
      border-color: $red-on;
    }
    &--green{
      border-color: $green-on;
    }
    &--yellow{
      border-color: $yellow-on;
    }
  }
}

.semaphore__light{
  border-radius: 100px;
  height: $diameter;
  width: $diameter;
  margin: 3px 0px;

  &__red{
    &--on{
      background-color: $red-on;
      box-shadow: 0 0 10px 3px $red-on;
    }
    &--off{
      background-color: $red-off;
    }
  }
  &__yellow{
    &--on{
      background-color: $yellow-on;
      box-shadow: 0 0 10px 3px $yellow-on;
    }
    &--off{
      background-color: $yellow-off;
    }
  }
  &__green{
    &--on{
      background-color: $green-on;
      box-shadow: 0 0 10px 3px $green-on;
    }
    &--off{
      background-color: $green-off;
    }
  }

}
</style>

<template>
    <div class="racing-tracker">
        <div>{{ me }}</div>
        <div class="racer" v-for="(racer, key) in racers" :key="key">
            <div class="racer__description">
                {{racer.name}} <span class="racer__username">{{racer.username}}</span>
            </div>
            <div>{{racer.progress}}</div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'RacingTracker',
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
  }
}
</script>

<style lang="scss" scoped>
.racer{
    &__description{
        color: blue;
    }

    &__username{
        color: lightblue;
    }
}
</style>

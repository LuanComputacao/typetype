<template>
  <div class="speedometer">
    <div class="speedometer__backpanel">
    <div class="speedometer__stick"></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
$speedometer-diameter: 100px;
$stick-witdth: 6px;

.speedometer{
  &__backpanel{
    background-color: $grey-panel-on;
    height: $speedometer-diameter;
    width: $speedometer-diameter;
    border-radius: $speedometer-diameter;
  }

  &__stick{
    background-color: $blue-on;
    height: ($speedometer-diameter/2) - 5px;
    width: $stick-witdth;
    border-radius: $stick-witdth;
    transform: rotate(-90deg);
    position: relative;
    left: $speedometer-diameter/2;
    top: $speedometer-diameter/2;;
  }
}
</style>

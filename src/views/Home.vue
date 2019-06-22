<template>
  <div class="home">
    <p>Are you a good Typist?</p>
    <p>How many words per minute can you type?</p>
    <p>Discover it!!!</p>
    <div>
      <router-link :to="{name: 'run'}" v-t="'home--run_link'"/>
      <br>
      <p v-t="'home--run_text'"/>
    </div>

    <div>
      <router-link :to="{name: 'training'}" v-t="'home--training_link'"/>
      <br>
      <p v-t="'home--training_text'"/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'home'
}
</script>

<template>
  <div class="home">
    <p>Are you a good Typist?</p>
    <p>How many words per minute can you type?</p>
    <p>Discover it!!!</p>
    <div>
      <router-link :to="{name: 'run'}">
        Run now
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'home'
}
</script>

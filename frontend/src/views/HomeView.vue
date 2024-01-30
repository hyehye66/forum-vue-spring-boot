<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.svg">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script setup>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

</script>

<style scoped>
img {
  width: 8rem;
  display: flex;
  justify-content: center;
}

.home {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
}
</style>
<script setup lang="ts">
import Picture from '@kwai-explore/picture.vue';
import examplePic from './assets/example.jpg?preset=modern';
function onLoad(...args: any[]) {
  console.log(...args);
}
</script>

<template>
  <div>vue3 demo</div>
  <!-- <Picture :src="examplePic"></Picture> -->
  <Picture :src="examplePic" placeholder="color" @load="onLoad"></Picture>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vuehover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>

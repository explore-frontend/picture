<script setup lang="ts">
import Picture from "@kwai-explore/picture.vue";
import examplePic from "./assets/example.jpg?preset=modern";

function onLoad(...args: any[]) {
  console.log("load", ...args);
}
function onClick(e: Event) {
  console.log(e);
}
</script>

<template>
  <div>vue3 demo</div>
  <Picture
    :src="examplePic"
    placeholder="color"
    class="picture"
    @load="onLoad"
    @click="onClick"
  />
</template>

<style scoped>
.picture {
  border: 5px solid red;
  width: 200px;
  height: 100px;
  overflow: hidden;
  object-fit: cover;
}
</style>

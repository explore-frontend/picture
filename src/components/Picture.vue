<script setup lang="ts">
import { computed, onMounted, ref } from 'vue-demi';
// TODO: 封装 provider 来应对不同的接口
type ImageAttrs = Partial<HTMLImageElement> & {
  class?: string;
};
interface PictureProp {
  src: ImageAttrs[];
}

// TODO: 支持SSR/SSG
// https://codepedia.info/detect-browser-in-javascript
function getBrowserName() {
  const agent = navigator.userAgent.toLowerCase();
  switch (
    true // case agent.indexOf("edge") > -1: return "MS Edge";
  ) {
    // case agent.indexOf("edg/") > -1: return "Edge ( chromium based)";
    // case agent.indexOf("opr") > -1 && !!window.opr: return "Opera";
    // case agent.indexOf("chrome") > -1 && !!window.chrome!: return "Chrome";
    case agent.includes('chrome'):
      return 'Chrome';
    // case agent.indexOf("trident") > -1: return "MS IE";
    case agent.includes('firefox'):
      return 'Mozilla Firefox';
    case agent.includes('safari'):
      return 'Safari';
    default:
      return 'other';
  }
}

const props = defineProps<PictureProp>();

// https://github.com/ElMassimo/iles/blob/main/packages/images/src/Picture.vue
const allSources = computed(() => props.src);
const sources = computed(() => allSources.value.slice(0, -1));
const lastSource = computed(
  () => allSources.value[allSources.value.length - 1],
);
const bgColors = ['#A7D2CB', '#874C62', '#C98474', '#F2D388'];
const lightenColors = ['#dcedea', '#d4b2bf', '#e9cec7', '#faedcf'];

const bgIndex = Math.floor(Math.random() * bgColors.length);
const bgColor = bgColors[bgIndex];
const bgColorLight = lightenColors[bgIndex];
const loaded = ref(false);

const safariSrc = ref();
const isSafari = getBrowserName() === 'Safari';
onMounted(() => {
  safariSrc.value = lastSource.value.src;
});
</script>

<script lang="ts">
export default {
  inheritAttrs: false,
};
</script>

<template>
  <div class="image-container" :class="{ loaded: loaded }">
    <picture>
      <source
        v-for="(attrs, index) in (sources as any)"
        :key="index"
        v-bind="attrs"
      />
      <img
        v-bind="{ ...lastSource, ...$attrs } as any"
        :src="isSafari ? safariSrc : lastSource.src"
        :srcset="isSafari ? safariSrc : lastSource.src"
        @load="loaded = true"
      />
    </picture>
  </div>
</template>

<style scoped>
.image-container {
  animation: placeholder ease-in-out 2s infinite;
}
.image-container img {
  width: 100%;
}
@keyframes placeholder {
  0% {
    background-color: v-bind(bgColor);
  }
  50% {
    background-color: v-bind(bgColorLight);
  }
  100% {
    background-color: v-bind(bgColor);
  }
}
@keyframes fadeIn {
  0% {
    opacity: 0%;
  }
  100% {
    opacity: 100%;
  }
}
.image-container.loaded {
  animation: none;
}
.image-container.loaded img {
  animation: fadeIn linear 0.5s;
}
</style>

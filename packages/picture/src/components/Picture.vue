<script setup lang="ts">
import { computed, onMounted, ref, isVue2 } from 'vue-demi';

export type SourceOption = {
  type: string;
  srcset: string;
};
export type ImgOption = {
  src: string;
} & SimpleImgHTMLAttributes;

// TODO: 封装 provider 来应对不同的接口
/** vite-imagetools 风格的 picture 数据格式 */
export type ImageToolsPictureOption = {
  fallback: ImgOption & {w?: number}
  // avif: xxx.avif, webp: xx.webp
  sources: {
    [key: string]: {
      src: string;
      w?: number;
    };
  }[];
};


/** image-prest 风格的 picture 数据格式 */
export type ImagePresetPictureOption = [...SourceOption[], ImgOption];

export type Numberish = number | string;
// todo 以后只支持 vue3 的时候就可以换成vue提供的类型了
export interface SimpleImgHTMLAttributes {
  alt?: string;
  crossorigin?: 'anonymous' | 'use-credentials' | '';
  decoding?: 'async' | 'auto' | 'sync';
  height?: Numberish;
  sizes?: string;
  src?: string;
  srcset?: string;
  usemap?: string;
  width?: Numberish;
  type?: string;
}

export type PictureOption = ImagePresetPictureOption | ImageToolsPictureOption;

// 这里的属性其实也有点奇怪...理论上大部分只需要放在最后一个就可以了
// 其实跟生产端不太一样
interface PictureProp {
  src: PictureOption;
  // color 会展示一个渐变色块的 loading 效果，加上 fade-in 的加载成功的渐变
  placeholder?: 'empty' | 'color';
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

const props = withDefaults(defineProps<PictureProp>(), {
  placeholder: 'empty',
});
function isNotNil<T>(x: T): x is NonNullable<T> {
  return x != null;
}

function assertNotNil<T>(v: T, message?: string): asserts v is NonNullable<T> {
  if (!isNotNil(v)) {
    throw new Error(message ?? 'Must not be null or undefined');
  }
}
const allSources = computed(() => props.src);
const sources = computed<{srcset?: string; type?: string;}[]>(() =>
  'fallback' in allSources.value
    ? Object.entries(allSources.value.sources ?? {}).map(([key, val]) => {
      return {
        type: `image/${key}`,
        srcset: val[0]?.src,
      }
    })
    : allSources.value.slice(0, -1),
);
const lastSource = computed(() => {
  const res =
    'fallback' in allSources.value
      ? allSources.value.fallback
      : allSources.value[allSources.value.length - 1];
  assertNotNil(res);
  return res as ImgOption;
});

const bgColors = ['#A7D2CB', '#874C62', '#C98474', '#F2D388'];
const lightenColors = ['#dcedea', '#d4b2bf', '#e9cec7', '#faedcf'];

const bgIndex = Math.floor(Math.random() * bgColors.length);
const bgColor = bgColors[bgIndex];
const bgColorLight = lightenColors[bgIndex];
const loaded = ref(false);

const safariSrc = ref();
const isSafari = getBrowserName() === 'Safari';
// 测试过url变化时加载的图片符合预期
onMounted(() => {
  safariSrc.value = lastSource.value.src;
});

const emit = defineEmits<{
  (event: 'load', ev: Event): void;
}>();

function handleLoad(ev: Event) {
  emit('load', ev);
  loaded.value = true;
}
</script>

<script lang="ts">
export default {
  inheritAttrs: false,
};
</script>

<template>
  <picture
    class="image-container"
    :class="{ loaded: loaded, 'placeholder-player': placeholder === 'color' }"
  >
    <source v-for="(attrs, index) in sources" :key="index" v-bind="attrs" />
    <img
      v-bind="{ ...lastSource, ...$attrs }"
      :src="isSafari ? safariSrc : lastSource.src"
      :srcset="isSafari ? safariSrc : lastSource.src"
      v-on="isVue2 ? $listeners : {}"
      @load="handleLoad"
    />
  </picture>
</template>

<style scoped>
.placeholder-player {
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
.placeholder-player.loaded {
  animation: none;
}
.placeholder-player.loaded img {
  animation: fadeIn linear 0.5s;
}
</style>

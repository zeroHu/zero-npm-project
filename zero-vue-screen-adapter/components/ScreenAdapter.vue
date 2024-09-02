<template>
  <div class="v-screen-adapter-container"
      :style="activeStyle">
    <slot></slot>
  </div>
</template>

<script setup>
import {ref, onMounted, computed, onBeforeUnmount} from 'vue';

const props = defineProps({
  designWidth: {
    type: Number,
    default: 1920, // 设计稿的宽度
  },
  designHeight: {
    type: Number,
    default: 1080, // 设计稿的高度
  },
  mode: {
    type: String,
    default: 'width', // 可选值: 'width', 'height', 'auto'
  },
});

const scale = ref(1);

const activeStyle = computed(() => ({
  transform: `scale(${scale.value}) translate(-50%, -50%)`,
  width: `${props.designWidth}px`,
  height: `${props.designHeight}px`
}));


const updateScale = () => {
  const sw =  window.innerWidth / props.designWidth;
  const sh = window.innerHeight / props.designHeight;

  scale.value = sw <   sh ? sw : sh
};

// 防抖
const debounce = (fn, t) => {
  const delay = t || 500
  let timer;
  return function() {
    const args = arguments
    if (timer) {
      clearTimeout(timer)
    }
    const context = this
    timer = setTimeout(() => {
      timer = null
      fn.apply(context, args)
    }, delay)
  }
};

const dUpdateScale = debounce(updateScale, 300);


onMounted(() => {
  updateScale();
  window.addEventListener('resize', dUpdateScale);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', dUpdateScale)
});
</script>


<style scoped>
.v-screen-adapter-container {
  transform-origin: 0 0;
  position: absolute;
  left: 50%;
  top: 50%;
  transition: 0.3s;
  background: transparent;
}
</style>
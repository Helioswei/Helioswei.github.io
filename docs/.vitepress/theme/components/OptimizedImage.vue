<template>
  <img
    :src="src"
    :alt="alt"
    :width="width"
    :height="height"
    :loading="lazy ? 'lazy' : 'eager'"
    :decoding="'async'"
    :class="{ 'lazy-image': lazy, loaded }"
    @load="onLoad"
    @error="onError"
  />
</template>

<script setup>
import { ref, onMounted } from 'vue'

const props = defineProps({
  src: String,
  alt: String,
  width: [String, Number],
  height: [String, Number],
  lazy: {
    type: Boolean,
    default: true
  }
})

const loaded = ref(false)

const onLoad = () => {
  loaded.value = true
}

const onError = (event) => {
  // 图片加载失败时的处理
  console.warn(`图片加载失败: ${props.src}`)
  // 可以设置默认图片
  event.target.src = '/images/placeholder.png'
}
</script>

<style scoped>
.lazy-image {
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
}

.lazy-image.loaded {
  opacity: 1;
}
</style>
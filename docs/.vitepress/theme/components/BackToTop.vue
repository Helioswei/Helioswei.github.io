<template>
  <button
    v-if="show"
    @click="scrollToTop"
    class="back-to-top"
    :class="{ visible }"
    title="回到顶部"
  >
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
      <path fill="currentColor" d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"/>
    </svg>
  </button>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const show = ref(false)
const visible = ref(false)

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const handleScroll = () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop
  show.value = scrollTop > 300
  // 添加延迟效果
  setTimeout(() => {
    visible.value = show.value
  }, 100)
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.back-to-top {
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background-color: var(--vp-c-brand);
  color: white;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.3s ease;
  z-index: 1000;
}

.back-to-top.visible {
  opacity: 1;
  transform: translateY(0);
}

.back-to-top:hover {
  background-color: var(--vp-c-brand-dark);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.back-to-top:active {
  transform: translateY(0);
}

@media (max-width: 768px) {
  .back-to-top {
    bottom: 16px;
    right: 16px;
    width: 40px;
    height: 40px;
  }
}
</style>
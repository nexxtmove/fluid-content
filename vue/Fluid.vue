<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({
  baseWidth: {
    type: Number,
    required: true,
  },
})

const container = ref(null)
const scale = ref(1)

const contentStyle = computed(() => ({
  width: `${props.baseWidth}px`,
  height: `${100 / scale.value}%`,
  transform: `scale(${scale.value})`,
  transformOrigin: 'top left',
}))

let resizeObserver

onMounted(() => {
  resizeObserver = new ResizeObserver(() => {
    scale.value = container.value.offsetWidth / props.baseWidth
  })

  resizeObserver.observe(container.value)
})

onBeforeUnmount(() => {
  resizeObserver.unobserve(container.value)
})
</script>

<template>
  <div ref="container">
    <div :style="contentStyle">
      <slot></slot>
    </div>
  </div>
</template>

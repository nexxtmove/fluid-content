<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { getContentStyle, getContentWidth } from '../common/utils'

const props = defineProps({
  base: {
    type: [Number, Array],
    required: true,
  },
})

const bases = Array.isArray(props.base) ? props.base : [props.base]

const container = ref(null)
const contentWidth = ref(bases[0])
const contentScale = ref(1)

const contentStyle = computed(() => getContentStyle(contentWidth.value, contentScale.value))

let resizeObserver

onMounted(() => {
  resizeObserver = new ResizeObserver(() => {
    const containerWidth = container.value.offsetWidth
    contentWidth.value = getContentWidth(bases, containerWidth)
    contentScale.value = containerWidth / contentWidth.value
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

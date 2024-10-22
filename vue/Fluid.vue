<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({
  base: {
    type: [Number, Array],
    required: true,
  },
})

const bases = Array.isArray(props.base) ? props.base : [props.base]
const isBasesAscending = bases.length >= 2 && bases[0] < bases[1]

const container = ref(null)
const contentWidth = ref(bases[0])
const contentScale = ref(1)

const contentStyle = computed(() => ({
  width: `${contentWidth.value}px`,
  height: `${100 / contentScale.value}%`,
  transform: `scale(${contentScale.value})`,
  transformOrigin: 'top left',
}))

let resizeObserver

onMounted(() => {
  resizeObserver = new ResizeObserver(() => {
    const containerWidth = container.value.offsetWidth

    contentWidth.value = bases.reduce((width, breakpoint) => {
      const isReached = isBasesAscending
        ? containerWidth >= breakpoint
        : containerWidth <= breakpoint

      return isReached ? breakpoint : width
    }, bases[0])

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

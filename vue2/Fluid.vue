<template>
  <div ref="container">
    <div :style="contentStyle">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { getContentStyle, getContentWidth } from '../common/utils'

export default {
  props: {
    base: {
      type: [Number, Array],
      required: true,
    },
  },
  data() {
    const bases = Array.isArray(this.base) ? this.base : [this.base]

    return {
      bases,
      contentWidth: bases[0],
      contentScale: 1,
    }
  },
  computed: {
    contentStyle() {
      return getContentStyle(this.contentWidth, this.contentScale)
    },
  },
  mounted() {
    this.resizeObserver = new ResizeObserver(() => {
      const containerWidth = this.$refs.container.offsetWidth
      this.contentWidth = getContentWidth(this.bases, containerWidth)
      this.contentScale = containerWidth / this.contentWidth
    })

    this.resizeObserver.observe(this.$refs.container)
  },
  beforeDestroy() {
    this.resizeObserver.unobserve(this.$refs.container)
  },
}
</script>

<script setup lang="ts">
defineProps({
  prefix: {
    type: String,
    default: '#icon-'
  },
  // 图标使用的名字
  name: String,
  color: {
    type: String,
    default: ''
  },
  width: {
    type: String,
    default: '16px'
  },
  height: {
    type: String,
    default: '16px'
  }
})
</script>

<template>
  <svg :style="{width, height}">
    <use :xlink:href="prefix + name" :fill="color"></use>
  </svg>
</template>

<style lang="scss" scoped>

</style>

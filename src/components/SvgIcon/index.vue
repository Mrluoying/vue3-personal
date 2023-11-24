<script setup lang="ts">
defineProps({
  prefix: {
    type: String,
    default: '#icon-',
  },
  // 图标使用的名字
  name: String,
  color: {
    type: String,
    default: '',
  },
  width: {
    type: String,
    default: '16px',
  },
  height: {
    type: String,
    default: '16px',
  },
})
// `defineOptions()` in <script setup> cannot reference locally declared variables because it will be hoisted outside of the setup() function. If your component options require initialization in the module scope, use a separate normal <script> to export the options instead.
// const iconName = computed(() => {
//   return name
// })
// defineOptions({
//   // 给组件起一个名字，因为引入的时候引入的都是index，会在vue组件插件中展示的组件名字都是index，不便于在插件中区分组件
//   // eslint-disable-next-line vue/no-reserved-component-names
//   name: `${iconName}Icon`,
// })
</script>
<template>
  <svg :style="{ width, height }">
    <use :xlink:href="prefix + name" :fill="color"></use>
  </svg>
</template>

<style lang="scss" scoped></style>

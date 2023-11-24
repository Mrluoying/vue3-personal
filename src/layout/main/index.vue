<script setup lang="ts">
defineOptions({
  // 给组件起一个名字，因为引入的时候引入的都是index，会在vue组件插件中展示的组件名字都是index，不便于在插件中区分组件
  // eslint-disable-next-line vue/no-reserved-component-names
  name: 'Main',
})
</script>

<template>
  <router-view v-slot="{ Component }">
    <transition name="fade">
      <component :is="Component" />
    </transition>
  </router-view>
</template>

<style lang="scss" scoped>
.fade-enter-from {
  opacity: 0;
}

.fade-enter-active {
  transition: all 1s;
}

.fade-enter-to {
  opacity: 1;
}
</style>

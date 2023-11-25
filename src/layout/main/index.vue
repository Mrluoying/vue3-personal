<script setup lang="ts">
defineOptions({
  // 给组件起一个名字，因为引入的时候引入的都是index，会在vue组件插件中展示的组件名字都是index，不便于在插件中区分组件
  // eslint-disable-next-line vue/no-reserved-component-names
  name: 'Main',
})
import useLayoutSettingStore from '@/store/modules/setting'
let layoutSettingStore = useLayoutSettingStore()
let flag = ref(true)
watch(
  () => layoutSettingStore.refresh,
  () => {
    flag.value = false
    nextTick(() => {
      flag.value = true
    })
  },
)
</script>

<template>
  <router-view v-slot="{ Component }">
    <transition name="fade">
      <component :is="Component" v-if="flag" />
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

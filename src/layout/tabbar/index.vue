<script setup lang="ts">
import TabbarLeft from './tabbarLeft'
import TabbarRight from './tabbarRight'
defineOptions({
  // 给组件起一个名字，因为引入的时候引入的都是index，会在vue组件插件中展示的组件名字都是index，不便于在插件中区分组件
  // eslint-disable-next-line vue/no-reserved-component-names
  name: 'TabBar',
})
</script>

<template>
  <div class="tabbar_container">
    <TabbarLeft></TabbarLeft>
    <TabbarRight></TabbarRight>
  </div>
</template>

<style lang="scss" scoped>
.tabbar_container {
  width: 100%;
  height: 100%;
  display: flex;
  padding: 0 15px;
  justify-content: space-between;
  background-image: linear-gradient(to right, rgb(141, 128, 128), black);
}
</style>

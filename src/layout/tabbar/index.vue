<script setup lang="ts">
import TabbarLeft from './tabbarLeft'
import TabbarRight from './tabbarRight'
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

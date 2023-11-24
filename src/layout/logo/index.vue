<script setup lang="ts">
import setting from '@/setting'
import useLayoutSettingStore from '@/store/modules/setting'

let layoutSettingStore = useLayoutSettingStore()
defineOptions({
  // 给组件起一个名字，因为引入的时候引入的都是index，会在vue组件插件中展示的组件名字都是index，不便于在插件中区分组件
  // eslint-disable-next-line vue/no-reserved-component-names
  name: 'Logo',
})
</script>

<template>
  <div class="logo_container">
    <img :src="setting.logo" />
    <span class="project_title" v-show="!layoutSettingStore.fold">
      {{ setting.title }}
    </span>
  </div>
</template>

<style lang="scss" scoped>
.logo_container {
  color: #fff;
  width: 100%;
  height: $base_menu_logo_height;
  padding: 5px 15px;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  img {
    width: 30px;
    height: 30px;
    border-radius: 50%;
  }
  .project_title {
    margin-left: 10px;
    font-size: 18px;
    white-space: nowrap;
  }
}
</style>

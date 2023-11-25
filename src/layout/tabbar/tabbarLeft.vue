<script setup lang="ts">
import { ArrowRight } from '@element-plus/icons-vue'
// 为什么非index文件使用@符号找不到模块
// import useLayoutSettingStore from '@/store/modules/setting.ts'
import useLayoutSettingStore from '../../store/modules/setting'

let layoutSettingStore = useLayoutSettingStore()
console.log(layoutSettingStore, 'layoutSettingStore')
//// 是否折叠状态
// let fold = ref(false)
// console.log(fold, 'fold')

import { useRoute } from 'vue-router'
const $route = useRoute()

let expandIconName = ref('expandLeft')
const handleChaneExpand = () => {
  console.log('改变图标')
  layoutSettingStore.changeFoldState()
  expandIconName.value = layoutSettingStore.fold ? 'expandRight' : 'expandLeft'
}
</script>

<template>
  <div class="tabbar_left">
    <svg-icon
      @click="handleChaneExpand"
      class="expand_svg"
      :name="expandIconName"
    ></svg-icon>
    <el-breadcrumb :separator-icon="ArrowRight">
      <el-breadcrumb-item
        v-for="(item, index) in $route.matched"
        :key="index"
        :to="{ path: item.path }"
        v-show="item.meta.title"
      >
        <div class="breadcrumb_item_container">
          <SvgIcon class="breadcrumb_icon" :name="item.meta.icon"></SvgIcon>
          {{ item.meta.title }}
        </div>
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<style lang="scss" scoped>
.tabbar_left {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .expand_svg {
    margin-right: 10px;
  }
  .breadcrumb_item_container {
    display: flex;
    justify-content: center;
    align-items: center;
    .breadcrumb_icon {
      margin-right: 4px;
    }
  }
}
</style>

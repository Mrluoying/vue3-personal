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
      <el-breadcrumb-item :to="{ path: '/' }">权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
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
}
</style>

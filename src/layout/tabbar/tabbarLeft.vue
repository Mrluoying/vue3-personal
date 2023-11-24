<script setup lang="ts">
import { ArrowRight } from '@element-plus/icons-vue'
</script>

<template>
  <div class="tabbar_left">
    <svg-icon class="expand_svg" name="expandLeft"></svg-icon>
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

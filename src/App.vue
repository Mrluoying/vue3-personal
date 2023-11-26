<script setup lang="ts">
import { ElConfigProvider } from 'element-plus'
// 将分页器的文字用中文展示，这里不同版本的引入路径会不一样
import zhcn from 'element-plus/es/locale/lang/zh-cn'
const locale = zhcn
</script>

<template>
  <el-config-provider :locale="locale">
    <router-view></router-view>
  </el-config-provider>
</template>

<style lang="scss" scoped>
.test-scss {
  color: $color;
}
</style>

<script setup lang="ts">
import 'element-plus/es/components/message/style/css'
import { ElMessage } from 'element-plus'
setTimeout(() => {
  ElMessage({
    message: 'this is a message.',
    grouping: true,
    type: 'success',
  })
}, 2000)

const test = ref('sdf')
</script>

<template>
  <div>展示登录之后的路由</div>
  <el-button type="primary">按钮</el-button>
  <el-input v-model="test"></el-input>
</template>

<style lang="scss" scoped></style>

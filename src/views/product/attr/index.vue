<script setup lang="ts">
defineOptions({
  name: 'Attr',
})
import { Plus } from '@element-plus/icons-vue'
</script>

<!-- 需要添加一个div包裹一下，要不然首页中使用了过渡动画，会有如下警告 -->
<!-- 
  <Transition> renders non-element root node that cannot be animated. 这句话的意思是：
  <Transition>中的组件渲染无法设置动画的非元素根节点
-->
<template>
  <div>
    <CateGory></CateGory>
    <el-card class="content_card">
      <el-button type="primary" :icon="Plus">添加属性</el-button>
      <el-table border class="table_container">
        <el-table-column
          label="序号"
          type="index"
          align="center"
          width="80px"
        ></el-table-column>
        <el-table-column width="180px" label="属性名称"></el-table-column>
        <el-table-column label="属性值名称"></el-table-column>
        <el-table-column width="180px" label="操作"></el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<style lang="scss" scoped>
.content_card {
  margin-top: 10px;
  .table_container {
    margin: 10px 0;
  }
}
</style>

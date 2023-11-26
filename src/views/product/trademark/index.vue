<script setup lang="ts">
import { Plus } from '@element-plus/icons-vue'
let currentPage = ref<number>(1)
// 每一页展示多少条数据
let pageSize = ref<number>(3)
let pageSizes = ref<number[]>([5, 10, 20, 50])
// 分页器是否禁用
let disabled = ref<boolean>(false)

const handleSizeChange = () => {}

const handleCurrentChange = () => {}
</script>

<template>
  <el-card>
    <el-button type="primary" :icon="Plus">添加品牌</el-button>
    <el-table border class="table_style">
      <el-table-column
        label="序号"
        width="80px"
        align="center"
      ></el-table-column>
      <el-table-column
        label="品牌名称"
        width="180px"
        align="center"
      ></el-table-column>
      <el-table-column
        label="品牌LOGO"
        width="180px"
        align="center"
      ></el-table-column>
      <el-table-column
        label="品牌操作"
        width="180px"
        align="center"
      ></el-table-column>
    </el-table>
    <!-- layout可以控制分页器的布局，可以通过书写顺序，以及在其中添加->这样的符号，能将前后的部分左右排列 -->
    <el-pagination
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :page-sizes="pageSizes"
      :disabled="disabled"
      layout="prev, pager, next, jumper,->, sizes, total"
      :total="400"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </el-card>
</template>

<style lang="scss" scoped>
.table_style {
  margin: 10px 0;
}
</style>

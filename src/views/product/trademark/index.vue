<script setup lang="ts">
import { Plus, Edit, Delete } from '@element-plus/icons-vue'
import { reqHasTrademark } from '@/api/product/trademark'
import type {
  Records,
  TradeMarkResponseData,
} from '@/api/product/trademark/type'
import TradeMarkDialog from './tradeMarkDialog.vue'
let currentPage = ref<number>(1)
// 每一页展示多少条数据
let pageSize = ref<number>(5)
let pageSizes = ref<number[]>([5, 10, 20, 50])
// 分页器是否禁用
let disabled = ref<boolean>(false)
let total = ref<number>(0)

let tableData = ref<Records>([])

const getHasTrademark = async () => {
  const res: TradeMarkResponseData = await reqHasTrademark(
    currentPage.value,
    pageSize.value,
  )
  console.log(res, '品牌数据')
  if (res.code === 200) {
    const { total: totalNum, current, records } = res.data
    total.value = totalNum
    currentPage.value = current
    tableData.value = records
  }
}

onMounted(() => {
  getHasTrademark()
})

const handleEdit = () => {}

const handleDelete = () => {}

const handleSizeChange = (size: number) => {
  // 每页展示条数改变之后，要将当前页置为1，要不然handleCurrentChange会被触发
  currentPage.value = 1
  pageSize.value = size
  console.log('分页size触发', size)
  getHasTrademark()
}

const handleCurrentChange = (current: number) => {
  currentPage.value = current
  console.log('分页current触发', current)
  getHasTrademark()
}
</script>

<template>
  <el-card>
    <el-button type="primary" :icon="Plus">添加品牌</el-button>
    <el-table :data="tableData" border class="table_style">
      <el-table-column
        label="序号"
        width="80px"
        align="center"
        type="index"
      ></el-table-column>
      <el-table-column
        label="品牌名称"
        align="center"
        prop="tmName"
      ></el-table-column>
      <el-table-column label="品牌LOGO" align="center" prop="logoUrl">
        <template v-slot="{ row }">
          <img class="logo_img" :src="row.logoUrl" alt="" />
        </template>
      </el-table-column>
      <el-table-column label="品牌操作" width="180px" align="center">
        <!-- v-slot="{ row }" -->
        <template>
          <el-button
            type="primary"
            size="small"
            :icon="Edit"
            @click="handleEdit"
          ></el-button>
          <el-button
            type="primary"
            size="small"
            :icon="Delete"
            @click="handleDelete"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- layout可以控制分页器的布局，可以通过书写顺序，以及在其中添加->这样的符号，能将前后的部分左右排列 -->
    <el-pagination
      :current-page="currentPage"
      :page-size="pageSize"
      :page-sizes="pageSizes"
      :disabled="disabled"
      layout="prev, pager, next, jumper,->, sizes, total"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </el-card>
  <TradeMarkDialog></TradeMarkDialog>
</template>

<style lang="scss" scoped>
.table_style {
  margin: 10px 0;
}
.logo_img {
  width: 100px;
  height: 100px;
}
</style>

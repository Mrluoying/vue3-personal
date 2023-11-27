<script setup lang="ts">
import { Plus, Edit, Delete } from '@element-plus/icons-vue'
import { reqHasTrademark, reqDeleteTrademark } from '@/api/product/trademark'
import type {
  Records,
  TradeMark,
  TradeMarkResponseData,
} from '@/api/product/trademark/type'
import TradeMarkDialog from './tradeMarkDialog.vue'
import { ElMessage } from 'element-plus'
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

const handleAdd = () => {
  if (tradeMarkDialogRef.value) {
    tradeMarkDialogRef.value.showDialog({
      title: '添加品牌',
    })
  }
}

const handleEdit = (rowData: TradeMark) => {
  console.log(rowData, '编辑')
  if (tradeMarkDialogRef.value) {
    tradeMarkDialogRef.value.showDialog({
      title: '编辑品牌',
      data: rowData,
    })
  }
}

const handleDelete = async (rowData: TradeMark) => {
  console.log(rowData, '删除')
  if (rowData.id) {
    const res = await reqDeleteTrademark(rowData.id)
    if (res.code === 200) {
      ElMessage({
        type: 'success',
        message: '删除品牌成功',
      })
      const temp = Math.ceil((total.value - 1 || 1) / pageSize.value)
      if (currentPage.value > temp) {
        currentPage.value = temp
      }
      getHasTrademark()
    } else {
      ElMessage({
        type: 'error',
        message: '删除品牌失败',
      })
    }
  }
}

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

const handelRefreshData = (operateType: string) => {
  if (operateType === 'add') {
    currentPage.value = 1
  }
  console.log('刷新一下数据')
  getHasTrademark()
}

const tradeMarkDialogRef = ref<InstanceType<typeof TradeMarkDialog>>()

console.log(tradeMarkDialogRef, 'tradeMarkDialogRef--tradeMarkDialogRef')
</script>

<template>
  <el-card>
    <el-button type="primary" @click="handleAdd" :icon="Plus">
      添加品牌
    </el-button>
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
        <template v-slot="{ row }">
          <el-button
            type="primary"
            size="small"
            :icon="Edit"
            @click="() => handleEdit(row)"
          ></el-button>
          <el-popconfirm
            @confirm="handleDelete(row)"
            title="你确定要删除这条数据嘛？"
          >
            <!-- @click="() => handleDelete(row)" -->
            <template #reference>
              <el-button type="primary" size="small" :icon="Delete"></el-button>
            </template>
          </el-popconfirm>
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
  <TradeMarkDialog
    @refreshData="handelRefreshData"
    ref="tradeMarkDialogRef"
  ></TradeMarkDialog>
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

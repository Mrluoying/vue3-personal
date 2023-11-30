<script setup lang="ts">
defineOptions({
  name: 'RoleManagement',
})
import { User, Edit, Delete } from '@element-plus/icons-vue'
// import { ElMessage } from 'element-plus'
import { reqAllRoleList, reqAllMenuList } from '@/api/acl/role'
import type {
  RoleResponseData,
  RoleRecords,
  RoleData,
  MenuResponseData,
  MenuList,
} from '@/api/acl/role/type'
import RoleDialog from './roleDialog.vue'
import AssignRoleDraw from './assignRoleDraw.vue'
let tableData = ref<RoleRecords>([])
const roleDialogRef = ref<InstanceType<typeof RoleDialog>>()
const roleDrawRef = ref<InstanceType<typeof AssignRoleDraw>>()
const getHasRole = async () => {
  const res: RoleResponseData = await reqAllRoleList(
    currentPage.value,
    pageSize.value,
    keyword.value,
  )
  console.log(res, '品牌数据')
  if (res.code === 200) {
    const { total: totalNum, current, records } = res.data
    total.value = totalNum
    currentPage.value = current
    tableData.value = records
    return 'ok'
  }
}
const keyword = ref('')
const handleSearch = () => {
  currentPage.value = 1
  getHasRole()
}

const handleResetSearch = () => {
  keyword.value = ''
  handleSearch()
}

onMounted(() => {
  getHasRole()
})

const handelRefreshData = (operateType: string) => {
  if (operateType === 'add') {
    currentPage.value = 1
  }
  getHasRole()
}

let currentPage = ref<number>(1)
// 每一页展示多少条数据
let pageSize = ref<number>(5)
let pageSizes = ref<number[]>([5, 10, 20, 50])
// 分页器是否禁用
let disabled = ref<boolean>(false)
let total = ref<number>(0)

const handleSizeChange = (size: number) => {
  // 每页展示条数改变之后，要将当前页置为1，要不然handleCurrentChange会被触发
  currentPage.value = 1
  pageSize.value = size
  console.log('分页size触发', size)
  getHasRole()
}

const handleCurrentChange = (current: number) => {
  currentPage.value = current
  console.log('分页current触发', current)
  getHasRole()
}

const handleEdit = (row: any) => {
  console.log(row)
  roleDialogRef.value!.showDialog({
    title: '编辑职位',
    data: {
      ...row,
    },
  })
}

const menuArr = ref<MenuList>([])
const handleRole = async (row: RoleData) => {
  console.log(row)
  const res: MenuResponseData = await reqAllMenuList(row.id as number)
  console.log(res, '所有权限数据')

  if (res.code === 200) {
    menuArr.value = res.data
    roleDrawRef.value?.showDraw({
      title: '分配权限',
    })
  }
}
const handleDelete = async (row: RoleData) => {
  console.log(row)
}

const handleAddRole = () => {
  roleDialogRef.value!.showDialog({
    title: '添加职位',
  })
}
</script>

<template>
  <div>
    <el-card class="form_card">
      <el-form inline>
        <el-form-item label="职位搜索">
          <el-input
            v-model="keyword"
            placeholder="请输入搜索职位关键字"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="handleSearch" :disabled="!keyword" type="primary">
            搜索
          </el-button>
          <el-button @click="handleResetSearch">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="table_card">
      <el-button type="primary" @click="handleAddRole">添加职位</el-button>
      <el-table :data="tableData" class="table_container" border>
        <el-table-column
          align="center"
          label="#"
          type="index"
        ></el-table-column>
        <el-table-column
          width="80px"
          prop="id"
          align="center"
          label="ID"
        ></el-table-column>

        <el-table-column
          prop="roleName"
          align="center"
          label="职位名称"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="createTime"
          align="center"
          label="创建时间"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="updateTime"
          align="center"
          label="更新时间"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column align="center" width="280px" label="操作">
          <template v-slot="row">
            <el-button
              type="primary"
              size="small"
              @click="handleRole(row.row)"
              :icon="User"
            >
              分配权限
            </el-button>
            <el-button
              type="primary"
              size="small"
              @click="handleEdit(row.row)"
              :icon="Edit"
            >
              编辑
            </el-button>
            <el-button
              type="primary"
              size="small"
              @click="handleDelete(row.row)"
              :icon="Delete"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
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
    <RoleDialog
      @refreshData="handelRefreshData"
      ref="roleDialogRef"
    ></RoleDialog>
    <AssignRoleDraw :menuArr="menuArr" ref="roleDrawRef"></AssignRoleDraw>
  </div>
</template>

<style lang="scss" scoped>
.form_card {
  height: 80px;
}
.table_card {
  margin: 10px 0;
  .table_container {
    margin: 15px 0;
  }
}
</style>

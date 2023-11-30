<script setup lang="ts">
defineOptions({
  name: 'UserManagement',
})
import { User, Edit, Delete } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { reqAclUserInfo, reqAllRole, reqRemoveUser } from '@/api/acl/user'
import type {
  UserReponseData,
  UserRecords,
  User as UserType,
  AllRoleResponseData,
} from '@/api/acl/user/type'
let tableData = ref<UserRecords>([])
const userDrawRef = ref()
const roleDrawRef = ref()
const getHasUser = async () => {
  const res: UserReponseData = await reqAclUserInfo(
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
  getHasUser()
}

const handleResetSearch = () => {
  keyword.value = ''
  handleSearch()
}

onMounted(() => {
  getHasUser()
})

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
  getHasUser()
}

const handleCurrentChange = (current: number) => {
  currentPage.value = current
  console.log('分页current触发', current)
  getHasUser()
}

const handleEdit = (row: UserType) => {
  console.log(row)
  Object.assign(userParams, row)
  userDrawRef.value.showDraw({
    title: '编辑用户',
  })
}
const handleRole = async (row: UserType) => {
  console.log(row)

  Object.assign(userParams, row)
  let res: AllRoleResponseData = await reqAllRole(userParams.id as number)
  if (res.code == 200) {
    roleDrawRef.value.showDraw({
      title: '分配用户角色',
      data: row,
      allRole: res.data.allRolesList,
      userRole: res.data.assignRoles,
    })
  }
}
const handleDelete = async (row: UserType) => {
  console.log(row)
  let res: any = await reqRemoveUser(row.id as number)
  if (res.code === 200) {
    ElMessage({
      type: 'success',
      message: '删除成功',
    })
    getHasUser()
  }
}

const handleAddRole = () => {
  if (userParams.id) {
    delete userParams.id
  }
  userDrawRef.value.showDraw({
    title: '添加用户',
  })
}

const userParams = reactive<Partial<UserType>>({
  username: '',
  name: '',
  password: '',
})

const handleResetParam = () => {
  Object.assign(userParams, {
    username: '',
    name: '',
    password: '',
  })
}

const handelRefreshData = () => {
  getHasUser()
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
          <el-button @click="handleSearch" type="primary">搜索</el-button>
          <el-button @click="handleResetSearch">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="table_card">
      <el-button type="primary" @click="handleAddRole">添加角色</el-button>
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
          prop="username"
          align="center"
          label="用户名字"
        ></el-table-column>
        <el-table-column
          prop="name"
          align="center"
          label="用户名称"
        ></el-table-column>
        <el-table-column
          prop="roleName"
          align="center"
          label="用户角色"
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

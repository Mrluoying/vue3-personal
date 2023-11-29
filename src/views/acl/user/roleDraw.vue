<script setup lang="ts">
// import { ElMessageBox } from 'element-plus'
defineOptions({
  name: 'RoleDraw',
})
import { reqSetUserRole } from '@/api/acl/user'
import type { RoleData, SetRoleData, User } from '@/api/acl/user/type'
import { ElMessage } from 'element-plus'
interface Props {
  userParams: Partial<User>
}
const props = defineProps<Props>()
const emits = defineEmits(['handleModelChange', 'resetParam', 'refreshData'])
const drawer = ref(false)
const title = ref('')

const showDraw = (drawOption: any) => {
  drawer.value = true
  const {
    title: drawTitle,
    allRole: allRoleProp,
    userRole: userRoleProp,
  } = drawOption
  title.value = drawTitle
  allRole.value = allRoleProp
  userRole.value = userRoleProp
  roleCheckALLStateInvoke()
}

const roleCheckALLStateInvoke = () => {
  const userRoleLength = userRole.value.length
  const allRoleLength = allRole.value.length
  checkAll.value = userRoleLength === allRoleLength
  isIndeterminate.value = userRoleLength > 0 && userRoleLength < allRoleLength
}

const userName = computed({
  get() {
    return props.userParams.username
  },
  set(value) {
    emits('handleModelChange', {
      username: value,
    })
  },
})

const checkAll = ref(false)
const isIndeterminate = ref(true)
const allRole = ref<RoleData[]>([])
const userRole = ref<RoleData[]>([])

const handleCheckAllChange = (val: boolean) => {
  userRole.value = val ? allRole.value : []
  isIndeterminate.value = false
}
const handleCheckedChange = (value: string[]) => {
  const checkedCount = value.length
  checkAll.value = checkedCount === allRole.value.length
  isIndeterminate.value =
    checkedCount > 0 && checkedCount < allRole.value.length
}

const handleDrawClosed = () => {
  emits('resetParam')
}

const cancelClick = () => {
  drawer.value = false
}
const confirmClick = async () => {
  const data: SetRoleData = {
    userId: props.userParams.id!,
    roleIdList: userRole.value.map((item) => item.id as number),
  }
  const res = await reqSetUserRole(data)
  if (res.code === 200) {
    ElMessage({
      type: 'success',
      message: '设置角色成功',
    })
    cancelClick()
    emits('refreshData')
  } else {
    ElMessage({
      type: 'error',
      message: '设置角色失败',
    })
  }
}

defineExpose({
  showDraw,
})
</script>

<template>
  <el-drawer @closed="handleDrawClosed" v-model="drawer">
    <template #header>
      <h4>{{ title }}</h4>
    </template>
    <template #default>
      <el-form :model="props.userParams">
        <el-form-item prop="username" label="用户姓名">
          <el-input
            :disabled="true"
            v-model="userName"
            placeholder="请输入用户姓名"
          ></el-input>
        </el-form-item>

        <el-form-item class="role_name_form" prop="roleName" label="职位列表">
          <el-checkbox
            v-model="checkAll"
            :indeterminate="isIndeterminate"
            @change="handleCheckAllChange"
          >
            全选
          </el-checkbox>
          <el-checkbox-group v-model="userRole" @change="handleCheckedChange">
            <el-checkbox v-for="role in allRole" :key="role.id" :label="role">
              {{ role.roleName }}
            </el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
    </template>
    <template #footer>
      <div style="flex: auto">
        <el-button @click="cancelClick">取消</el-button>
        <el-button type="primary" @click="confirmClick">确认</el-button>
      </div>
    </template>
  </el-drawer>
</template>

<style lang="scss" scoped>
:deep .role_name_form {
  .el-form-item__content {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>

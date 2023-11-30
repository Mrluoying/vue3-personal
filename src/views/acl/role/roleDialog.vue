<script setup lang="ts">
defineOptions({
  name: 'RoleDialog',
})
import type { RoleData } from '@/api/acl/role/type'
import { reqAddOrUpdateRole } from '@/api/acl/role'
// import { Plus } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import type { FormInstance } from 'element-plus'
const eventEmit = defineEmits(['refreshData'])
const roleParams = ref<RoleData>({
  roleName: '',
})
const roleRef = ref<FormInstance>()

const dialogVisible = ref<boolean>(false)
const title = ref<string>('这是一个默认标题')
const showDialog = (dialogOptions: any) => {
  dialogVisible.value = true
  const { title: dialogTitle, data } = dialogOptions
  title.value = dialogTitle
  console.log(data, '传入dialog数据')
  if (data) {
    roleParams.value.roleName = data.roleName
    roleParams.value.id = data.id
  } else {
    delete roleParams.value.id
  }
}
const handleCancle = () => {
  dialogVisible.value = false
}
const handleComfirm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log('submit!')
      addOrUpdateRole()
    } else {
      console.log('error submit!', fields)
    }
  })
}

const addOrUpdateRole = async () => {
  const res = await reqAddOrUpdateRole(roleParams.value)
  if (res.code === 200) {
    ElMessage({
      type: 'success',
      message: roleParams.value.id ? '编辑成功' : '添加成功',
    })
    handleCancle()
    eventEmit('refreshData', roleParams.value.id ? 'edit' : 'add')
  } else {
    ElMessage({
      type: 'error',
      message: roleParams.value.id ? '编辑失败' : '添加失败',
    })
  }
}

const handleDialogClosed = () => {
  roleParams.value.roleName = ''
  // 窗口关闭的时候  把校验的错误清掉
  roleRef.value && roleRef.value.clearValidate()
}

defineExpose({
  showDialog,
})
</script>

<template>
  <el-dialog
    @closed="handleDialogClosed"
    v-model="dialogVisible"
    :title="title"
  >
    <el-form :model="roleParams" class="dialog_form_container" ref="roleRef">
      <el-form-item prop="roleName" label-width="80px" label="职位名称">
        <el-input
          v-model="roleParams.roleName"
          placeholder="请输入职位名称"
        ></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog_footer">
        <el-button @click="handleCancle">取消</el-button>
        <el-button @click="handleComfirm(roleRef)">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style lang="scss" scoped>
.dialog_form_container {
  width: 80%;
}
</style>

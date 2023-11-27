<script setup lang="ts">
import { Plus } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import type { UploadProps, FormInstance, FormRules } from 'element-plus'
import { TradeMark } from '@/api/product/trademark/type'
import { reqAddOrUpdateTrademark } from '@/api/product/trademark'
const eventEmit = defineEmits(['refreshData'])
const tradeMarkParams = ref<TradeMark>({
  tmName: '',
  logoUrl: '',
})
const validatorTmName = (_rule: any, value: any, callback: any) => {
  if (value.trim().length >= 2) {
    callback()
  } else {
    callback(new Error('品牌名称位数需大于两位'))
  }
}

const validatorLogoUrl = (_rule: any, value: any, callback: any) => {
  if (value) {
    callback()
  } else {
    callback('请上传图片')
  }
}
const trademarkRef = ref<FormInstance>()

console.log(trademarkRef, 'trademarkRef')
const rules = reactive<FormRules>({
  tmName: [{ required: true, validator: validatorTmName }],
  logoUrl: [{ required: true, validator: validatorLogoUrl }],
})

const handleAvatarSuccess: UploadProps['onSuccess'] = (
  _response,
  uploadFile,
) => {
  tradeMarkParams.value.logoUrl = URL.createObjectURL(uploadFile.raw!)
}

const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  if (rawFile.type !== 'image/jpeg' && rawFile.type !== 'image/png') {
    ElMessage.error('Avatar picture must be JPG or PNG format!')
    return false
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('Avatar picture size can not exceed 2MB!')
    return false
  }
  return true
}
const dialogVisible = ref<boolean>(false)
const title = ref<string>('这是一个默认标题')
const showDialog = (dialogOptions: any) => {
  dialogVisible.value = true
  const { title: dialogTitle, data } = dialogOptions
  title.value = dialogTitle
  type objType = keyof TradeMark
  if (data) {
    Object.keys(tradeMarkParams.value).forEach((item) => {
      ;(tradeMarkParams.value[item as objType] as any) = data[item]
    })
    tradeMarkParams.value['id'] = data['id']
  } else {
    Object.keys(tradeMarkParams.value).forEach((item) => {
      ;(tradeMarkParams.value[item as objType] as any) = ''
    })
    delete tradeMarkParams.value.id
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
      addOrUpdateTrademark()
    } else {
      console.log('error submit!', fields)
    }
  })
}

const addOrUpdateTrademark = async () => {
  const res = await reqAddOrUpdateTrademark(tradeMarkParams.value)
  console.log(res, '添加一条数据之后')
  if (res.code === 200) {
    dialogVisible.value = false
    ElMessage({
      type: 'success',
      message: tradeMarkParams.value.id ? '编辑品牌成功' : '添加品牌成功',
    })
    eventEmit('refreshData', tradeMarkParams.value.id ? 'edit' : 'add')
  } else {
    ElMessage({
      type: 'error',
      message: tradeMarkParams.value.id ? '编辑品牌失败' : '添加品牌失败',
    })
  }
}

const handleDialogClosed = () => {
  // 窗口关闭的时候  把校验的错误清掉
  trademarkRef.value && trademarkRef.value.clearValidate()
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
    <el-form
      :model="tradeMarkParams"
      :rules="rules"
      class="dialog_form_container"
      ref="trademarkRef"
    >
      <el-form-item prop="tmName" label-width="80px" label="品牌名称">
        <el-input
          v-model="tradeMarkParams.tmName"
          placeholder="请输入品牌名称"
        ></el-input>
      </el-form-item>
      <el-form-item prop="logoUrl" label-width="80px" label="品牌LOGO">
        <el-upload
          class="avatar-uploader"
          action="/api/admin/product/fileUpload"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img
            v-if="tradeMarkParams.logoUrl"
            :src="tradeMarkParams.logoUrl"
            class="avatar"
          />
          <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog_footer">
        <el-button @click="handleCancle">取消</el-button>
        <el-button @click="handleComfirm(trademarkRef)">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style lang="scss" scoped>
.dialog_form_container {
  width: 80%;
  :deep .avatar-uploader {
    .avatar {
      width: 178px;
      height: 178px;
      display: block;
    }
    .el-upload {
      border: 1px dashed gray;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      transition: var(--el-transition-duration-fast);
    }
    .el-upload:hover {
      border-color: var(--el-color-primary);
    }
    .el-icon {
      &.avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        text-align: center;
      }
    }
  }
}
</style>

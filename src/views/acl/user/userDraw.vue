<script setup lang="ts">
// import { ElMessageBox } from 'element-plus'
defineOptions({
  name: 'UserDraw',
})
import { reqAddOrUpdateUser } from '@/api/acl/user'
import type { User } from '@/api/acl/user/type'
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
  const { title: drawTitle, data } = drawOption
  title.value = drawTitle
  console.log(data, 'dayinyixia')
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
const propName = computed({
  get() {
    return props.userParams.name
  },
  set(value) {
    emits('handleModelChange', {
      name: value,
    })
  },
})
const password = computed({
  get() {
    return props.userParams.password
  },
  set(value) {
    emits('handleModelChange', {
      password: value,
    })
  },
})

const handleDrawClosed = () => {
  emits('resetParam')
}

const cancelClick = () => {
  drawer.value = false
}
const confirmClick = async () => {
  const res = await reqAddOrUpdateUser(props.userParams)
  if (res.code! === 200) {
    if (props.userParams.id) {
      ElMessage({
        type: 'success',
        message: '编辑成功',
      })
    } else {
      ElMessage({
        type: 'success',
        message: '添加成功',
      })
    }
    cancelClick()
    emits('refreshData')
  } else {
    if (props.userParams.id) {
      ElMessage({
        type: 'error',
        message: '编辑失败',
      })
    } else {
      ElMessage({
        type: 'error',
        message: '添加失败',
      })
    }
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
          <el-input v-model="userName" placeholder="请输入用户姓名"></el-input>
        </el-form-item>
        <!-- @input="
            ($event: any) =>
              emits('handleModelChange', {
                name: $event,
              })
          " -->
        <el-form-item prop="name" label="用户昵称">
          <el-input v-model="propName" placeholder="请输入用户昵称"></el-input>
        </el-form-item>
        <el-form-item prop="passwrod" label="用户密码">
          <el-input v-model="password" placeholder="请输入用户密码"></el-input>
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

<style lang="scss" scoped></style>

<script setup lang="ts">
import 'element-plus/es/components/message/style/css'
import { User, Lock } from '@element-plus/icons-vue'
import useUserStore from '@/store/modules/user'
import { useRouter, useRoute } from 'vue-router'
import { ElNotification } from 'element-plus'
import type { FormInstance, FormRules } from 'element-plus'
interface RuleForm {
  username: string
  password: string
}
const router = useRouter()
const route = useRoute()
const userStore = useUserStore()
const validateUserName = (_rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请输入用户名'))
  } else {
    if (value.length < 5 || value.length > 10) {
      callback(new Error('用户名长度为5-10'))
    } else {
      callback()
    }
  }
}
const validatePassword = (_rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请输入密码'))
  } else {
    if (value.length < 6 || value.length > 10) {
      callback(new Error('密码长度为6-10'))
    } else {
      callback()
    }
  }
}
const loginRef = ref<FormInstance>()
const loginRules = reactive<FormRules<RuleForm>>({
  // username: [
  //   {
  //     required: true,
  //     message: '请输入用户名',
  //     trigger: 'blur',
  //   },
  //   {
  //     min: 6,
  //     max: 10,
  //     message: '用户名长度6-10',
  //     trigger: 'blur',
  //   },
  // ],
  // password: [
  //   {
  //     required: true,
  //     message: '请输入密码',
  //     trigger: 'blur',
  //   },
  //   {
  //     min: 6,
  //     max: 10,
  //     message: '密码长度6-10',
  //     trigger: 'blur',
  //   },
  // ],
  username: [{ validator: validateUserName }],
  password: [{ validator: validatePassword }],
})
const loginForm = reactive({
  username: '',
  password: '',
})

const loading = ref(false)

const handleSumbit = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log('submit!')
      login()
    } else {
      console.log('error submit!', fields)
    }
  })
}

const login = async () => {
  console.log('开始登陆')
  loading.value = true
  try {
    const res = await userStore.userLogin(loginForm)
    console.log(res, '当前返回结果')
    if (res === 'success') {
      ElNotification({
        type: 'success',
        message: '登陆成功',
      })
      if (route.query.redirect) {
        const { redirect, ...anotherQuery } = route.query
        router.push({
          path: route.query.redirect as string,
          query: anotherQuery,
        })
      } else {
        router.push('/')
      }
    }
  } catch (error) {
    console.log(error)
    ElNotification({
      type: 'error',
      message: (error as Error).message,
    })
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="login_continar">
    <el-row>
      <el-col :span="12" :xs="0"></el-col>
      <el-col :span="12" :xs="24">
        <el-form
          :model="loginForm"
          ref="loginRef"
          :rules="loginRules"
          class="login_form"
        >
          <h1>Hello</h1>
          <h2>欢迎使用vue3</h2>
          <el-form-item prop="username">
            <el-input
              :prefix-icon="User"
              v-model="loginForm.username"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              type="password"
              :prefix-icon="Lock"
              v-model="loginForm.password"
              show-password
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              :loading="loading"
              class="login_btn"
              type="primary"
              @click="handleSumbit(loginRef)"
            >
              登录
            </el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<style lang="scss" scoped>
.login_continar {
  width: 100%;
  height: 100vh;
  .login_form {
    position: relative;
    width: 80%;
    top: 30vh;
    background-color: rgb(139, 139, 231);
    padding: 40px;
    h1 {
      color: #fff;
      font-size: 40px;
      padding: 8px 0;
    }
    h2 {
      color: #fff;
      font-size: 20px;
      padding: 8px 0;
    }
    .login_btn {
      width: 100%;
    }
  }
}
</style>

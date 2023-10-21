<script setup lang="ts">
import 'element-plus/es/components/message/style/css'
import { User, Lock } from '@element-plus/icons-vue'
import useUserStore from '@/store/modules/user'
import { useRouter } from 'vue-router'
import { ElNotification } from 'element-plus'
const router = useRouter()
const userStore = useUserStore()
const loginForm = reactive({
  username: '',
  password: '',
})

const loading = ref(false)

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
      router.push('/')
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
        <el-form class="login_form">
          <h1>Hello</h1>
          <h2>欢迎使用vue3</h2>
          <el-form-item>
            <el-input
              :prefix-icon="User"
              v-model="loginForm.username"
            ></el-input>
          </el-form-item>
          <el-form-item>
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
              @click="login"
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

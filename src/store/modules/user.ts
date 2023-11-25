// 创建用户相关信息
import { defineStore } from 'pinia'
import { reqLogin, reqUserInfo } from '@/api/user'
import type { loginForm } from '@/api/user/type'
import type { UserState } from './types/type'
import { constantRoute } from '@/router/routes'
// 疑问  这里第一参数User有什么用
const useUserStore = defineStore('User', {
  state: (): UserState => {
    return {
      token: localStorage.getItem('TOKEN'),
      menuRoutes: constantRoute,
      username: '',
      avatar: '',
    }
  },
  actions: {
    async userLogin(data: loginForm) {
      console.log('111231321', data)
      const res = await reqLogin(data)
      console.log(res, '接口返回数据')
      if (res.code === 200) {
        this.token = res.data.token
        localStorage.setItem('TOKEN', res.data.token)
        this.userInfo()
        return 'success'
      } else {
        return Promise.reject(new Error(res.data.message))
      }
    },
    async userInfo() {
      const result = await reqUserInfo()
      console.log(result, '获取用户信息')
      if (result.code === 200) {
        this.username = result.data.checkUser.username
        this.avatar = '头像暂时没有'
      } else {
        this.username = ''
        this.avatar = ''
      }
    },
    userLogout() {
      // 目前没有mock接口，退出登录接口（通知服务器本地用户唯一标识失效）
      this.token = ''
      this.username = ''
      this.avatar = ''
      localStorage.removeItem('TOKEN')
    },
  },
  getters: {},
})

export default useUserStore

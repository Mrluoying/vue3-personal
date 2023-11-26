// 创建用户相关信息
import { defineStore } from 'pinia'
import { reqLogin, reqUserInfo, reqLogout } from '@/api/user'
// import type { loginForm } from '@/api/user/type'
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
    async userLogin(data: any) {
      console.log('111231321', data)
      const res: any = await reqLogin(data)
      console.log(res, '接口返回数据')
      if (res.code === 200) {
        this.token = res.data
        localStorage.setItem('TOKEN', res.data)
        this.userInfo()
        return 'success'
      } else {
        return Promise.reject(new Error(res.message))
      }
    },
    async userInfo() {
      const result: any = await reqUserInfo()
      console.log(result, '获取用户信息')
      if (result.code === 200) {
        this.username = result.data.name
        // this.avatar = '头像暂时没有'
        this.avatar = result.data.avatar
        // 因为这里是一个async函数，返回的是一个promise，外面需要根据promise返回的状态进行判断
        // 所这里需要有返回值，要不然返回的是一个undefined，不好做判断
        return 'ok'
      } else {
        this.username = ''
        this.avatar = ''
        return Promise.reject('获取用户信息失败')
      }
    },
    async userLogout() {
      // 目前没有mock接口，退出登录接口（通知服务器本地用户唯一标识失效）
      const result = await reqLogout()
      if (result.code === 200) {
        this.token = ''
        this.username = ''
        this.avatar = ''
        localStorage.removeItem('TOKEN')
        return 'ok'
      } else {
        return Promise.reject(new Error(result.message))
      }
    },
  },
  getters: {},
})

export default useUserStore

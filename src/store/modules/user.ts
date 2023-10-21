// 创建用户相关信息
import { defineStore } from 'pinia'
import { reqLogin } from '@/api/user'
import type { loginForm } from '@/api/user/type'
// 疑问  这里第一参数User有什么用
const useUserStore = defineStore('User', {
  state: () => {
    return {
      token: localStorage.getItem('TOKEN'),
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
        return 'success'
      } else {
        return Promise.reject(new Error(res.data.message))
      }
    },
  },
  getters: {},
})

export default useUserStore

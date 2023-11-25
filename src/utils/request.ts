import axios from 'axios'
import useUserStore from '@/store/modules/user'
// 创建axios实例
const request = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 5000,
})

request.interceptors.request.use((config) => {
  // config配置对象，headers属性请求头，经常给服务器端携带公共参数
  // 返回配置对象
  console.log(config, 'axios config')
  const userStore = useUserStore()
  console.log(userStore.token, 'userStore.token')

  // config配置对象，headers属性请求头，经常给服务器端携带公共传参数
  if (userStore.token) {
    config.headers.token = userStore.token
  }
  return config
})

request.interceptors.response.use(
  (response) => {
    console.log(response, 'axios response')
    return response.data
  },
  (error) => {
    console.log(error, 'axios response error')
    let message = ''
    const status = error.response.status
    switch (status) {
      case 401:
        message = 'Token 过期'
        break
      case 403:
        message = '暂无权访问'
        break
      case 404:
        message = '请求地址错误'
        break
      case 500:
        message = '服务器出现问题'
        break
      default:
        message = '网络出现问题'
        break
    }
    console.log(message)
    return Promise.reject(error)
  },
)

export default request

import type { ResponseData } from '@/api/type'

export interface loginForm {
  username: string
  password: string
}

interface dataType {
  token: string
  message: string
}

// 定义全部接口返回数据都拥有的ts类型
// export interface ResponseData {
//   code: number
//   message: string
//   ok: boolean
// }

// 定义登录接口返回数据类型
export interface loginResponseData extends ResponseData {
  data: string
}

// 定义登录接口返回数据类型
export interface userInfoReponseData extends ResponseData {
  data: {
    routes: string[]
    buttons: string[]
    roles: string[]
    name: string
    avatar: string
  }
}

interface userInfo {
  userId: number
  avatar: string
  username: string
  password: string
  desc: string
  roles: string[]
  buttons: string[]
  routes: string[]
  token: string
}

interface user {
  checkUser: userInfo
}

export interface userResponseData {
  code: number
  data: user
}

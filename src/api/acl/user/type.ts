import type { ResponseData } from '@/api/type'
export interface User {
  id?: number
  createTime: string
  updateTime: string
  username: string
  password: string
  name: string
  phone: string
  roleName: string
}

export type UserRecords = User[]

export interface UserReponseData extends ResponseData {
  data: {
    records: UserRecords
    total: number
    size: number
    current: number
    pages: number
  }
}

export interface RoleData {
  id?: number
  createTime?: string
  updateTime?: string
  roleName: string
  remark: null
}

export type AllRole = RoleData[]

export interface AllRoleResponseData extends ResponseData {
  data: {
    assignRoles: AllRole
    allRolesList: AllRole
  }
}

export interface SetRoleData {
  roleIdList: number[]
  userId: number
}

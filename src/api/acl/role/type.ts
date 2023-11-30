import type { ResponseData } from '@/api/type'

export interface RoleData {
  id?: number
  createTime?: string
  updateTime?: string
  roleName: string
  remark: null
}

export type RoleRecords = RoleData[]

export interface RoleResponseData extends ResponseData {
  data: {
    records: RoleRecords
    total: number
    size: number
    current: number
    orders: []
    optimizeCountSql: boolean
    hitCount: boolean
    countId: null
    maxLimit: null
    searchCount: boolean
    pages: number
  }
}

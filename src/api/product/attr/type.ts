import { ResponseData } from '@/api/type'

export interface CategoryObj {
  id: number | string
  name: string
  category1Id?: number
  category2Id?: number
}

export interface CategoryResponseData extends ResponseData {
  data: CategoryObj[]
}

// 属性值对象的ts类型
export interface AttrValue {
  id?: number
  attrId?: number
  valueName?: string
  rowFlag?: boolean
}

// 存储每一个属性值的数组类型
export type AttrValueList = AttrValue[]

// 属性对象
export interface Attr {
  id?: number
  attrName: string
  categoryId: number | string
  categoryLevel: number
  attrValueList: AttrValueList
}

export type AttrList = Attr[]

export interface AttrResponseData extends ResponseData {
  data: AttrList
}

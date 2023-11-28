import request from '@/utils/request'
import type { AttrResponseData, CategoryResponseData, Attr } from './type'
enum API {
  C1_URL = '/admin/product/getCategory1',
  C2_URL = '/admin/product/getCategory2/',
  C3_URL = '/admin/product/getCategory3/',
  ATTR_URL = '/admin/product/attrInfoList/',
  ADDORUPDATEATTR_URL = '/admin/product/saveAttrInfo',
}

export const reqC1 = () => request.get<any, CategoryResponseData>(API.C1_URL)

export const reqC2 = (cateGory1Id: number | undefined) =>
  request.get<any, CategoryResponseData>(API.C2_URL + cateGory1Id)

export const reqC3 = (cateGory2Id: number | undefined) =>
  request.get<any, CategoryResponseData>(API.C3_URL + cateGory2Id)

export const reqAttr = (
  cateGory1Id: number | string,
  cateGory2Id: number | string,
  cateGory3Id: number | string,
) => {
  return request.get<any, AttrResponseData>(
    API.ATTR_URL + `${cateGory1Id}` + `/${cateGory2Id}` + `/${cateGory3Id}`,
  )
}

export const addOrUpdateAttr = (data: Attr) => {
  return request.post<any, any>(API.ADDORUPDATEATTR_URL, data)
}

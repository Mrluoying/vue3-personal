import request from '@/utils/request'
import type { CategoryResponseData } from './type'
enum API {
  C1_URL = '/admin/product/getCategory1',
  C2_URL = '/admin/product/getCategory2/',
  C3_URL = '/admin/product/getCategory3/',
}

export const reqC1 = () => request.get<any, CategoryResponseData>(API.C1_URL)

export const reqC2 = (cateGory1Id: number | undefined) =>
  request.get<any, CategoryResponseData>(API.C2_URL + cateGory1Id)

export const reqC3 = (cateGory2Id: number | undefined) =>
  request.get<any, CategoryResponseData>(API.C3_URL + cateGory2Id)

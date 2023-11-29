import request from '@/utils/request'
import type { UserReponseData } from './type'
enum API {
  ALLUSER_URL = '/admin/acl/user/',
}
export const reqAclUserInfo = (page: number, limit: number) =>
  request.get<any, UserReponseData>(API.ALLUSER_URL + `${page}/${limit}`)

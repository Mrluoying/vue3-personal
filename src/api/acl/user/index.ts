import request from '@/utils/request'
import type {
  UserReponseData,
  User,
  AllRoleResponseData,
  SetRoleData,
} from './type'
enum API {
  ALLUSER_URL = '/admin/acl/user/',
  ADDUSER_URL = '/admin/acl/user/save',
  UPDATEUSER_URL = '/admin/acl/user/update',
  ALLROLE_URL = '/admin/acl/user/toAssign/',
  SETROLE_URL = '/admin/acl/user/doAssignRole',
}
export const reqAclUserInfo = (page: number, limit: number) =>
  request.get<any, UserReponseData>(API.ALLUSER_URL + `${page}/${limit}`)

export const reqAddOrUpdateUser = (data: Partial<User>) => {
  if (data.id) {
    return request.put<any, any>(API.UPDATEUSER_URL, data)
  } else {
    return request.post<any, any>(API.ADDUSER_URL, data)
  }
}

export const reqAllRole = (userId: number) => {
  return request.get<any, AllRoleResponseData>(API.ALLROLE_URL + userId)
}

export const reqSetUserRole = (data: SetRoleData) => {
  return request.post<any, any>(API.SETROLE_URL, data)
}

import { xlRequest } from '..'
import { IAccount, IDateType, ILoginResultType } from './type'

enum LoginAPi {
  AccountLogin = '/login',
  UserInfo = '/users/',
  UserMenus = '/role/'
}

export function accountLoginRequest(account: IAccount) {
  return xlRequest.post<IDateType<ILoginResultType>>({
    url: LoginAPi.AccountLogin,
    data: account,
    isShowLoading: false
  })
}

export function requestUserInfoById(id: number) {
  return xlRequest.get<IDateType<any>>({
    url: LoginAPi.UserInfo + id,
    isShowLoading: false
  })
}

export function requestUserMenusByRoleId(roleId: number) {
  return xlRequest.get<IDateType<any>>({
    url: LoginAPi.UserMenus + roleId + '/menu'
  })
}

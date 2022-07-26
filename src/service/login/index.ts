import { xlRequest } from '..'
import { IAccount, IDataType, ILoginResultType } from './type'

enum LoginAPi {
  AccountLogin = '/login',
  UserInfo = '/users/',
  UserMenus = '/role/'
}

export function accountLoginRequest(account: IAccount) {
  return xlRequest.post<IDataType<ILoginResultType>>({
    url: LoginAPi.AccountLogin,
    data: account,
    isShowLoading: false
  })
}

export function requestUserInfoById(id: number) {
  return xlRequest.get<IDataType<any>>({
    url: LoginAPi.UserInfo + id,
    isShowLoading: false
  })
}

export function requestUserMenusByRoleId(roleId: number) {
  return xlRequest.get<IDataType<any>>({
    url: LoginAPi.UserMenus + roleId + '/menu'
  })
}

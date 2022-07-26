import { IDashboardState } from './analysis/types'
import ILoginState from './login/types'
import { ISystemState } from './system/types'

interface IRootState {
  entireDepartment: any[]
  entireRole: any[]
  entireMenu: any[]
}

interface IRootWithModule {
  loginModule: ILoginState
  systemModule: ISystemState
  dashboardModule: IDashboardState
}

export type IUseStore = IRootState & IRootWithModule

export default IRootState

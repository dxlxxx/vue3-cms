import ILoginState from './login/types'
import { ISystemState } from './system/types'

interface IRootState {
  entireDepartment: any[]
  entireRole: any[]
}

interface IRootWithModule {
  loginModule: ILoginState
  systemModule: ISystemState
}

export type IUseStore = IRootState & IRootWithModule

export default IRootState

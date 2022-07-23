import ILoginState from './login/types'
import { ISystemState } from './system/types'

interface IRootState {
  name: string
}

interface IRootWithModule {
  loginModule: ILoginState
  systemModule: ISystemState
}

export type IUseStore = IRootState & IRootWithModule

export default IRootState

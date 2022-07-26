export interface IAccount {
  name: string
  password: string
}

export interface IDataType<T = any> {
  code: string
  data: T
}

export interface ILoginResultType {
  id: number
  name: string
  token: string
}

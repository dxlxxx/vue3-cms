import { xlRequest } from '@/service'
import { IDataType } from '@/service/login/type'

export function getPageList(url: string, queryInfo: any) {
  return xlRequest.post<IDataType>({
    url,
    data: queryInfo
  })
}

export function deletePageData(url: string) {
  return xlRequest.delete<IDataType>({
    url
  })
}

export function editPageData(url: string, editData: any) {
  return xlRequest.patch<IDataType>({
    url: url,
    data: editData
  })
}

export function createPageData(url: string, newData: any) {
  return xlRequest.post<IDataType>({
    url: url,
    data: newData
  })
}

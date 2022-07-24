import { xlRequest } from '@/service'
import { IDateType } from '@/service/login/type'

export function getPageList(url: string, queryInfo: any) {
  return xlRequest.post<IDateType>({
    url,
    data: queryInfo
  })
}

export function deletePageData(url: string) {
  return xlRequest.delete<IDateType>({
    url
  })
}

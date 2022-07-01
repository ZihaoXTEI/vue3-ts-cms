import myRequset from '../../index'

import { IDataType } from '../../type'

// 获取页面数据
export function getPageListData(url: string, queryInfo: any) {
  return myRequset.post<IDataType>({
    url: url,
    data: queryInfo
  })
}

// 创建数据
export function createPageData(url: string, newData: any) {
  return myRequset.post<IDataType>({
    url: url,
    data: newData
  })
}

// 修改数据
export function editPageData(url: string, id: any, editData: any) {
  return myRequset.patch<IDataType>({
    url: url + id,
    data: editData
  })
}

// 删除数据:  /users/id
export function deletePageData(url: string, id: any) {
  return myRequset.delete<IDataType>({
    url: url + id
  })
}

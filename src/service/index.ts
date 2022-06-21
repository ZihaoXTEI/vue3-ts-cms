// service 统一出口
import MyRequest from './request'
import { BASE_URL, TIME_OUT } from './request/config'

const myRequest = new MyRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT
  // interceptors:{

  // }
})

export default myRequest

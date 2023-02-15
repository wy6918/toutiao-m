/**
 * 用户相关请求模块
 **/
import request from '@/utils/reques'
export const Login = (data) => {
  return request({
    method: 'POST',
    url: '/v1_0/authorizations',
    data
  })
}

export const Send = mobile => {
  return request({
    method: 'GET',
    url: ' /v1_0/sms/codes/:mobile'
  })
}

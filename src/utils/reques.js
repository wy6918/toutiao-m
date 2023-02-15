import axios from 'axios'
import store from '@/store'
const request = axios.create({
  baseURL: 'http://toutiao.itheima.net/'
})

// 请求拦截器
request.interceptors.request.use(
  (config) => {
    const user = store.state.user
    if (user) {
      config.headers.Authorization = `Bearer ${user.token}`
    }
    return config
  },
  (err) => {
    return Promise.reject(err)
  }
)
// 响应拦截器
request.interceptors.response.use(
  (response) => {
    return response
  },
  (err) => {
    return Promise.reject(err)
  }
)

export default request

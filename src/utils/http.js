// encapsulate axios
//instance request response
import axios from 'axios'
import { getToken } from './token'
import { history } from './history'
const http = axios.create({
  baseURL: 'http://geek.itheima.net/v1_0',
  timeout: 5000
})
// request
http.interceptors.request.use((config) => {

  const token = getToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}, (error) => {

  return Promise.reject(error)
})

// response
http.interceptors.response.use((response) => {
  // 2xx 范围内的状态码都会触发该函数。
  // 对响应数据做点什么
  return response.data
}, (error) => {
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么
  console.log(error)
  if (error.response.status === 401) {
    // react-router doesn't work here
    console.log('login')
    history.push('/login')
  }
  return Promise.reject(error)
})

export { http }
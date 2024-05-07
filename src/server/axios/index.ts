import MYRequest from './axios'
import { BASE_URL, TIME_OUT } from './config'
import type { AxiosRequestConfig } from 'axios'

const myRequest = new MYRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  //拦截器里 在请求拦截器里取出token并带上
  interceptors: {
    // 局部网络请求
    requestSuccessFn: (config) => {
      const token = localStorage.getItem('access_token')
      if (config.headers && token) {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    },
    responseSuccessFn(res) {
      return res.data
    },
    async responseFailureFn(err) {
      interface PendingTask {
        config: AxiosRequestConfig
        resolve: Function
      }

      let refreshing = false

      const queue: PendingTask[] = []

      if (!err.response) {
        return Promise.reject(err)
      }

      const { data, config } = err.response

      if (data.code === 401 && !config.url.includes('user/admin/refresh')) {
        if (refreshing) {
          return new Promise((resolve) => {
            queue.push({
              config,
              resolve
            })
          })
        }
        refreshing = true
        const res = await refreshToken().catch((err) => {
          return err.response
        })

        refreshing = false
        if (res.satus === 200) {
          queue.forEach(({ config, resolve }) => {
            resolve(request.request(config))
          })
          return request.request(config)
        } else {
          setTimeout(() => {
            window.location.href = 'http://localhost:5173/#/login'
          }, 1500)
          throw data
        }
      } else {
        throw err.response.data
      }

      // if (!err.response) {
      //   return Promise.reject({ data: 'no response' })
      // } else {
      //   return Promise.reject(err.response.data)
      // }
    }
  }
})
const request = new MYRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT
})
async function refreshToken() {
  const res = await request.get({
    url: '/user/admin/refresh',
    params: {
      refresh_token: `Bearer ${localStorage.getItem('refresh_token')}`
    }
  })
  localStorage.setItem('access_token', res.data.access_token || '')
  localStorage.setItem('refresh_token', res.data.refresh_token || '')
  return res
}

export default myRequest

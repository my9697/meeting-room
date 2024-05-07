import { defineStore } from 'pinia'
import { ref } from 'vue'
import { postInfo, emailLoginCaptcha, emailLogin } from '@/server/common'

interface ILoginInfo {
  username: string

  password: string
}

const useLoginStore = defineStore('login', () => {
  const flag = ref()
  const errMessage = ref()
  const emailLoginMas = ref()
  const loginMes = ref()
  async function getLoginInfoAction(loginInfo: ILoginInfo) {
    try {
      const res = await postInfo('login', loginInfo)
      flag.value = true
      localStorage.setItem('access_token', res.data.accessToken)
      localStorage.setItem('refresh_token', res.data.refreshToken)
      localStorage.setItem('user_info', JSON.stringify(res.data.userInfo))
    } catch (error: any) {
      flag.value = false
      errMessage.value = error.data
      console.log(111)
    }
  }
  async function getEmailLoginCaptcha(email: string) {
    try {
      emailLoginMas.value = true
      await emailLoginCaptcha(email)
    } catch (error: any) {
      emailLoginMas.value = false
    }
  }

  async function eLogin(data: Record<string, any>) {
    try {
      await emailLogin(data)
      loginMes.value = true
    } catch (error: any) {
      loginMes.value = false
    }
  }
  return {
    getLoginInfoAction,
    flag,
    errMessage,
    getEmailLoginCaptcha,
    emailLoginMas,
    loginMes,
    eLogin
  }
})
export default useLoginStore

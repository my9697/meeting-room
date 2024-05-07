import { defineStore } from 'pinia'
import type { IformData } from '../type/index'
import { postInfo, getRegisterCaptcha } from '../server/common'
import { ref } from 'vue'

const useRegisterStore = defineStore('register', () => {
  const flag = ref()
  const errMessage = ref()
  const captchaSuccess = ref()
  async function registerPost(data: IformData) {
    try {
      const res = await postInfo('register', data)
      flag.value = true
      console.log(res.data)
    } catch (error: any) {
      console.log(error, 'xxx')
      flag.value = false
      errMessage.value = error.data
    }
  }
  async function captchaGet(email: string) {
    try {
      const res = await getRegisterCaptcha(email)
      console.log(res)

      captchaSuccess.value = true
    } catch (error) {
      console.log(error)
    }
  }
  return { registerPost, flag, errMessage, captchaGet, captchaSuccess }
})

export default useRegisterStore

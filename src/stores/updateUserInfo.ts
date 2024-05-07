import { ref } from 'vue'
import { postInfo } from '../server/common'
import { getUpdateInfoCaptcha, getUserInfo } from '@/server/updateUserInfo'
import { defineStore } from 'pinia'
import type { IupdateInfo } from '../type/index'
const useUpdateInfoStore = defineStore('updateInfo', () => {
  const flag = ref()
  const errMessage = ref()
  const captchaSuccess = ref()

  async function updateInfoAction(date: IupdateInfo) {
    try {
      await postInfo('update', date)
      flag.value = true
    } catch (error: any) {
      console.log(error)

      flag.value = false
      errMessage.value = error.data
    }
  }
  async function captchaGet(adress: string) {
    try {
      const res = await getUpdateInfoCaptcha(adress)
      captchaSuccess.value = true
      console.log(res)
    } catch (error: any) {
      errMessage.value = error.data
      console.log(error)
    }
  }
  async function representerInfo() {
    try {
      const res = await getUserInfo()
      console.log(res)
    } catch (e) {
      console.log(e)
    }
  }

  return { updateInfoAction, captchaGet, captchaSuccess, errMessage, flag, representerInfo }
})
export default useUpdateInfoStore

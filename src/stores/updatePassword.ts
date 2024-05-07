import { ref } from 'vue'
import { getUpdateCaptcha, postInfo } from '../server/common'
import { defineStore } from 'pinia'
import type { IupdatePassword } from '../type/index'
const useUpdatePasswordStore = defineStore('updatePassword', () => {
  const flag = ref()
  const errMessage = ref()
  const captchaSuccess = ref()

  async function updatePasswordAction(date: IupdatePassword) {
    try {
      postInfo('update_password', date)
      flag.value = true
    } catch (error: any) {
      console.log(error)

      flag.value = false
      errMessage.value = error.data
    }
  }
  async function captchaGet(adress: string) {
    try {
      const res = await getUpdateCaptcha(adress)
      captchaSuccess.value = true
      console.log(res)
    } catch (error) {
      console.log(error)
    }
  }

  return { updatePasswordAction, captchaGet, captchaSuccess, errMessage, flag }
})
export default useUpdatePasswordStore

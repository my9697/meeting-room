import myRequest from './axios/index'
import type { IupdateInfo } from '@/type'

export async function getUserInfo() {
  return await myRequest.get({
    url: '/user/info'
  })
}

export async function update_userInfo(data: IupdateInfo) {
  return await myRequest.post({
    url: 'user/update',
    params: {
      data
    }
  })
}

export function getUpdateInfoCaptcha(email: string) {
  return myRequest.get({
    url: '/user/update_userInfo/captcha',
    params: {
      adress: email
    }
  })
}

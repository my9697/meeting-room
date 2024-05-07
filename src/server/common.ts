import myRequest from './axios/index'

export function postInfo(urlName: string, info: Record<string, any>) {
  return myRequest.post({
    url: `/user/${urlName}`,
    data: info
  })
}

// 获取注册注册验证码
export function getRegisterCaptcha(email: string) {
  return myRequest.get({
    url: '/user/register-captcha',
    params: {
      address: email
    }
  })
}
// 获取更新验证码
export function getUpdateCaptcha(email: string) {
  return myRequest.get({
    url: '/user/update_password/captcha',
    params: {
      adress: email
    }
  })
}

export function emailLoginCaptcha(email: string) {
  return myRequest.get({
    url: '/user/emailLogin/captcha',
    params: {
      adress: email
    }
  })
}

export function emailLogin(data: Record<string, any>) {
  return myRequest.post({
    url: '/user/emailLogin',

    data: data
  })
}

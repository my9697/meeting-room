// register的表单验证的数据类型
export interface IformData {
  username: string
  password: string
  nickName: string
  checkPass: string
  email: string
  captcha: string
  group: string
  department: string
}
// 修改密码的表单验证的数据类型
export interface IupdatePassword {
  username: string
  email: string
  captcha: string
  password: string
  checkPass?: string
}
export interface IupdateInfo {
  nickName: string
  email: string
  captcha: string
  headPic: string
}

export interface FormState {
  name: string
  location: string
  capacity: number
  equipment: string
  description: string
}

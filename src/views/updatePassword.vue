<script setup lang="ts">
import type { IupdatePassword } from '../type/index'
import type { Rule } from 'ant-design-vue/es/form'
import type { FormInstance } from 'ant-design-vue'
import { reactive, ref } from 'vue'
import useUpdatePasswordStore from '../stores/updatePassword'
import { message } from 'ant-design-vue'
import { useRouter } from 'vue-router'

message.config({
  top: '5rem'
})

const formData = reactive<IupdatePassword>({
  username: '',
  password: '',
  checkPass: '',
  email: '',
  captcha: ''
})

const router = useRouter()

const updatePasswordStore = useUpdatePasswordStore()
async function updatePassword() {
  await updatePasswordStore.updatePasswordAction(formData)

  updatePasswordStore.flag
    ? message.success('注册成功')
    : message.error(updatePasswordStore.errMessage || '系统繁忙，请稍后再试')
  if (updatePasswordStore.flag) {
    router.push('/login')
  }
}
async function deliver() {
  if (!formData.email) {
    message.error('请输入邮箱地址')
  } else {
    await updatePasswordStore.captchaGet(formData.email)
    updatePasswordStore.captchaSuccess
      ? message.success('发送成功')
      : message.error('系统繁忙，请稍后再试')
  }
}
const formRef = ref<FormInstance>()

const validatePass = async (_rule: Rule, value: string) => {
  if (value === '') {
    return Promise.reject('请输入密码')
  } else {
    if (formData.checkPass !== '') {
      formRef.value?.validateFields('checkPass')
    }
    return Promise.resolve()
  }
}
const validatePass2 = async (_rule: Rule, value: string) => {
  if (value === '') {
    return Promise.reject('请再次输入密码')
  } else if (value !== formData.password) {
    return Promise.reject('两次输入密码不一样!')
  } else {
    return Promise.resolve()
  }
}

const rules: Record<string, Rule[]> = {
  password: [
    { required: true, validator: validatePass, trigger: 'change' },
    { min: 6, message: '请输入6位以上的密码' }
  ],
  checkPass: [
    { validator: validatePass2, trigger: 'change' },
    { required: true, message: '请确认密码' }
  ],
  email: [{ required: true, message: '邮箱不能为空' }],
  captcha: [{ required: true, message: '验证码不能为空' }],
  username: [{ required: true, message: '用户名不能为空' }]
}
</script>

<template>
  <div class="updatePassword" h-100vh flex items-center justify-center>
    <div class="content" h-110 w-110 flex flex-col>
      <div class="header" mb-15 h-14 text-center>
        <h1>会议室预定系统</h1>
      </div>
      <div class="body" mb-5>
        <a-form
          layout="horizontal"
          style="max-width: 600px"
          :label-col="{ span: 4 }"
          :wrapper-col="{ span: 60 }"
          :model="formData"
          name="custom-validation"
          :rules="rules"
        >
          <a-form-item hasFeedback label="用户名" name="username">
            <a-input type="input" v-model:value="formData.username" />
          </a-form-item>
          <a-form-item hasFeedback label="密码" name="password">
            <a-input type="password" autocomplete="off" v-model:value="formData.password" />
          </a-form-item>
          <a-form-item hasFeedback label="确认密码" name="checkPass">
            <a-input type="password" autocomplete="off" v-model:value="formData.checkPass" />
          </a-form-item>
          <a-form-item name="email" label="邮箱" :rules="[{ type: 'email' }]">
            <a-input v-model:value="formData.email" />
          </a-form-item>
          <a-form name="customized_form_controls" layout="inline" relative mb-6 pl-4>
            <a-form-item name="captcha" label="验证码" :rules="[{}]">
              <a-input v-model:value="formData.captcha" />
            </a-form-item>
            <a-form-item absolute right-0>
              <a-space>
                <a-button type="primary" @click="deliver">发送验证码</a-button>
                <context-holder />
              </a-space>
            </a-form-item>
          </a-form>
        </a-form>
      </div>
      <div class="footer" ml-19 rounded text-center text-xl leading-10 text-white>
        <a-space>
          <a-button type="primary" h-10 w-91 @click="updatePassword">修改</a-button>
          <context-holder />
        </a-space>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less"></style>

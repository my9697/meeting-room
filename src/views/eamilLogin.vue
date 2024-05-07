<script setup lang="ts">
import { reactive, ref } from 'vue'
import { message } from 'ant-design-vue'
import type { Rule } from 'ant-design-vue/es/form'
import useLoginStore from '../stores/login'
import { useRouter } from 'vue-router'

const router = useRouter()
message.config({
  top: '5rem'
})

interface Iform {
  email: string
  captcha: string
}

const formData = reactive<Iform>({
  email: '',
  captcha: ''
})

const rules: Record<string, Rule[]> = {
  email: [{ required: true, message: '邮箱不能为空' }],
  captcha: [{ required: true, message: '验证码不能为空' }]
}
const loginStore = useLoginStore()
async function login() {
  await loginStore.eLogin(formData)
  loginStore.loginMes ? message.success('登录成功') : message.error('系统繁忙，请稍后再试')
  if (loginStore.loginMes) {
    router.push('/main')
  }
}
async function deliver() {
  if (!formData.email) {
    message.error('请输入邮箱地址')
  } else {
    await loginStore.getEmailLoginCaptcha(formData.email)
    loginStore.emailLoginMas ? message.success('发送成功') : message.error('系统繁忙，请稍后再试')
  }
}
</script>

<template>
  <div class="register" h-100vh flex items-center justify-center>
    <div class="content" h-150 w-110 flex flex-col px-3 text-lg>
      <div class="header" mb-15 h-14 text-center>
        <h1>会议室预定系统</h1>
      </div>
      <div class="body" mb-5>
        <a-form
          :label-col="{ span: 4 }"
          :wrapper-col="{ span: 60 }"
          :model="formData"
          name="custom-validation"
          :rules="rules"
        >
          <a-form-item
            name="email"
            label="邮箱"
            :rules="[{ type: 'email', message: '邮箱格式错误' }]"
          >
            <a-input v-model:value="formData.email" />
          </a-form-item>
          <a-form name="customized_form_controls" layout="inline" relative pl-4>
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
      <div class="footer" ml-18 rounded text-center text-xl leading-10 text-white>
        <a-space>
          <a-button type="primary" h-10 w-92 @click="login">登录</a-button>
          <context-holder />
        </a-space>
      </div>
    </div>
  </div>
</template>

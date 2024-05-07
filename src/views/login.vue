<script setup lang="ts">
import { reactive } from 'vue'
import useLoginStore from '../stores/login'
import { message } from 'ant-design-vue'
import { useRouter } from 'vue-router'

message.config({
  top: '150px'
})

const router = useRouter()

const formState = reactive({
  username: '',
  password: ''
})
const loginStore = useLoginStore()

async function login() {
  await loginStore.getLoginInfoAction(formState)

  loginStore.flag
    ? message.success('登录成功')
    : message.error(loginStore.errMessage || '系统繁忙，请稍后再试')
  if (loginStore.flag) {
    router.push('/main')
  }
}
function register() {
  router.push('/register')
}
function password() {
  router.push('/updatePassword')
}

function emailLogin() {
  router.push('/emailLogin')
}
</script>

<template>
  <div class="login" relative h-100vh flex items-center justify-center>
    <div class="content" h-100 w-105 flex flex-col px-3 py-5>
      <div class="header" mb-14 h-16 text-center>
        <h1>会议室预定系统</h1>
      </div>
      <div class="body" mb-5>
        <a-form :label-col="{ span: 4 }" :wrapper-col="{ span: 60 }" :model="formState">
          <a-form-item
            label="用户名"
            name="username"
            :rules="[{ required: true, message: '请输入用户名' }]"
          >
            <a-input allowClear v-model:value="formState.username" />
          </a-form-item>
          <a-form-item
            label="密码"
            name="password"
            :rules="[
              { required: true, message: '请输入密码' },
              { min: 6, message: '请输入六位以上的密码' }
            ]"
          >
            <a-input-password v-model:value="formState.password" />
          </a-form-item>
        </a-form>
        <div class="register" ml-13 w-92 flex justify-between>
          <div w-50 pl-5 hover:cursor-pointer hover:text-sky-500 @click="register">创建帐号</div>
          <div w-50 text-end hover:cursor-pointer hover:text-sky-500 @click="password">
            忘记密码
          </div>
        </div>
      </div>
      <div class="footer" ml-18 rounded text-center text-xl leading-10 text-white>
        <a-space>
          <a-button type="primary" h-10 w-88 @click="login">登录</a-button>
          <context-holder />
        </a-space>
      </div>
    </div>
    <div absolute bottom-40 left-230 hover:cursor-pointer hover:text-sky-500 @click="emailLogin">
      邮箱登录
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IupdateInfo } from '../type/index'
import { reactive, ref } from 'vue'
import useUpdateInfoStore from '../stores/updateUserInfo'
import { message } from 'ant-design-vue'
import type { UploadChangeParam } from 'ant-design-vue'
import type { Rule } from 'ant-design-vue/es/form'
message.config({
  top: '5rem'
})

const formData = reactive<IupdateInfo>({
  nickName: '',
  email: '',
  captcha: '',
  headPic: ''
})
const localStorageData = localStorage.getItem('user_info') as string
const data = JSON.parse(localStorageData)
formData.nickName = data.nickName
formData.email = data.email
formData.headPic = data.headPic

const updateInfoStore = useUpdateInfoStore()
async function updateInfo() {
  await updateInfoStore.updateInfoAction(formData)

  updateInfoStore.flag
    ? message.success('修改成功')
    : message.error(updateInfoStore.errMessage || '系统繁忙，请稍后再试')
}
async function deliver() {
  if (!formData.email) {
    message.error('请输入邮箱地址')
  } else {
    await updateInfoStore.captchaGet(formData.email)

    updateInfoStore.captchaSuccess
      ? message.success('发送成功')
      : message.error(updateInfoStore.errMessage || '系统繁忙，请稍后再试')
  }
}

const handleChange = (info: UploadChangeParam) => {
  if (info.file.status !== 'uploading') {
    formData.headPic = info.file.response.data
    console.log(info.file, info.fileList)
  }
  if (info.file.status === 'done') {
    message.success('头像上传成功')
  } else if (info.file.status === 'error') {
    message.error('头像上传失败')
  }
}

const fileList = ref([])
const headers = {
  authorization: 'authorization-text'
}

const rules: Record<string, Rule[]> = {
  nickName: [{ required: true, message: '昵称不能为空' }],
  email: [{ required: true, message: '邮箱不能为空' }],
  captcha: [{ required: true, message: '邮箱不能为空' }]
}

function getImgUrl() {
  const imgUrl = new URL(formData.headPic, 'http://localhost:3005').href
  console.log(imgUrl)
  return imgUrl
}
</script>

<template>
  <div flex items-center justify-center>
    <div mt-10 w-110 flex flex-col>
      <div ml-50 h-25 w-25 overflow-hidden rounded-full bg-slate>
        <img :src="getImgUrl()" alt="" h-full w-full />
      </div>
      <div ml-52 mt-4>
        <a-upload
          v-model:file-list="fileList"
          name="file"
          action="http://localhost:3005/user/upload"
          :headers="headers"
          @change="handleChange"
          :maxCount="1"
        >
          <a-button> 更换头像</a-button>
        </a-upload>
      </div>

      <div mb-5 mt-15>
        <a-form
          layout="horizontal"
          style="max-width: 600px"
          :label-col="{ span: 4 }"
          :wrapper-col="{ span: 60 }"
          :rules="rules"
        >
          <a-form-item label="昵称" name="nickName">
            <a-input v-model:value="formData.nickName" />
          </a-form-item>
          <a-form-item label="邮箱" :rules="[{ type: 'email' }]" name="email">
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
      <div class="footer" ml-18 rounded text-center text-xl leading-10 text-white>
        <a-space>
          <a-button type="primary" h-10 w-92.8 @click="updateInfo">修改</a-button>
          <context-holder />
        </a-space>
      </div>
    </div>
  </div>
</template>

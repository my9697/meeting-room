<script setup lang="ts">
import { useRouter } from 'vue-router'
import { UserOutlined, VideoCameraOutlined, HomeOutlined } from '@ant-design/icons-vue'
import { ref } from 'vue'

const router = useRouter()
const flag = ref(true)
function update() {
  if (!flag.value) {
    flag.value = true
    router.push('/main/meetingList')
  } else {
    flag.value = false
    router.push('/main/updateUserInfo')
  }
}
function Click(even: any) {
  router.push(even.key)
}
</script>

<template>
  <div class="main" h-100vh>
    <a-layout h-100vh>
      <a-layout-sider breakpoint="lg" collapsed-width="0">
        <a-menu theme="dark" mode="inline" mt-15 text-lg @click="Click">
          <a-menu-item key="/meetingList">
            <user-outlined />
            <span class="nav-text">会议室列表</span>
          </a-menu-item>
          <a-menu-item key="/bookingHistory" mt-3>
            <video-camera-outlined />
            <span class="nav-text">我的预定</span>
          </a-menu-item>
        </a-menu>
      </a-layout-sider>
      <a-layout>
        <a-layout-header :style="{ background: '#fff' }" flex items-center justify-between px-3>
          <h1 text-4xl>会议室预定系统</h1>
          <div @click="update">
            <template v-if="flag">
              <div h-13 w-13 overflow-hidden rounded-full bg-slate>
                <img src="#" alt="" h-ful w-full />
              </div>
            </template>
            <template v-else><HomeOutlined text-4xl /></template>
          </div>
        </a-layout-header>
        <a-layout-content :style="{ margin: '24px 16px 0' }">
          <div :style="{ padding: '24px', background: '#fff' }">
            <RouterView />
          </div>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </div>
</template>

<template>
  <div class="user-info">
    <el-dropdown size="large" @command="handleCommand">
      <!-- 头像 -->
      <el-avatar
        src="https://storage.360buyimg.com/i.imageUpload/c0e8e8f7bac031353931363039373734353132_mid.jpg"
      />
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item command="userinfo">用户信息</el-dropdown-item>
          <el-dropdown-item command="1">系统管理</el-dropdown-item>
          <el-dropdown-item command="exit" divided icon="CircleCloseFilled"
            >退出系统</el-dropdown-item
          >
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'

import { useStore } from '@/store'
import { useRouter } from 'vue-router'

import sessionCache from '@/utils/sessioncache'

export default defineComponent({
  name: 'user-info',
  setup() {
    const store = useStore()
    const name = computed(() => store.state.login.userInfo.name)

    const router = useRouter()

    const handleCommand = (command: string | number | object) => {
      console.log(command)
      if (command === 'exit') {
        handleExitClick()
      }
    }

    // 退出系统
    const handleExitClick = () => {
      // 清空 Storage
      sessionCache.deleteCache('token')
      sessionCache.deleteCache('userinfo')
      sessionCache.deleteCache('usermenus')
      // 跳转至登录页
      router.push('/login')
    }
    return {
      name,
      handleCommand
    }
  }
})
</script>

<style lang="less" scoped></style>

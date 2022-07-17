<template>
  <div class="user-info">
    <div class="info">
      <el-dropdown size="large" @command="handleCommand">
        <span class="el-dropdown-link">
          <!-- 头像 -->
          <el-avatar
            class="avatar"
            src="https://storage.360buyimg.com/i.imageUpload/c0e8e8f7bac031353931363039373734353132_mid.jpg"
          />
          <span class="username">{{ name }}{{ greeting }}</span>
        </span>

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

    <div class="operation">
      <span>
        <el-icon class="icon"><Bell /></el-icon>
      </span>
      <span>
        <el-icon class="icon"><ChatLineSquare /></el-icon>
      </span>
      <span>
        <el-icon class="icon"><Postcard /></el-icon>
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'

// import { useStore } from '@/store'
import { useRouter } from 'vue-router'

import sessionCache from '@/utils/sessioncache'

import { currentTime } from '@/utils/date-format'

export default defineComponent({
  name: 'user-info',
  setup() {
    // const store = useStore()
    // const name = computed(() => store.state.login.userInfo.name)
    const name = ref('栎梓')

    const router = useRouter()

    const handleCommand = (command: string | number | object) => {
      console.log(command)
      if (command === 'exit') {
        handleExitClick()
      }
    }

    const greeting = computed(() => {
      const currenttime = currentTime()
      const hour = parseInt(currenttime.slice(0, 2))

      if (hour >= 6 && hour <= 12) {
        return ' ，早上好'
      } else if (hour > 12 && hour <= 17) {
        return ' ，下午好'
      } else {
        return ' ，晚上好'
      }
    })

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
      greeting,
      handleCommand
    }
  }
})
</script>

<style lang="less" scoped>
.user-info {
  display: flex;
  flex-direction: row-reverse;
  align-items: center;

  .el-dropdown-link {
    display: flex;
    align-items: center;
    cursor: pointer;

    .avatar {
      width: 30px;
      height: 30px;
    }

    .username {
      margin-left: 8px;
    }
  }
}
.operation {
  margin-right: 20px;

  span {
    position: relative;
    display: inline-block;
    width: 40px;
    height: 40px;
    line-height: 45px;
    border-radius: 8px;

    &:hover {
      background-color: #f2f2f2;
    }

    .icon {
      font-size: 20px;
    }

    // .dot {
    //   position: absolute;
    //   top: 3px;
    //   right: 3px;
    //   width: 6px;
    //   height: 6px;
    //   border-radius: 100%;
    //   background-color: red;
    //   z-index: 10;
    // }
  }
}
</style>

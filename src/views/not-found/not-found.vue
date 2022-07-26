<!-- eslint-disable prettier/prettier -->
<template>
  <div class="container">
    <div class="img"></div>
    <div class="tips">
      该页面不存在，系统将在 {{ countdown }} 秒后自动跳转回首页
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'not-found',
  setup() {
    const countdown = ref(10)
    const router = useRouter()

    onMounted(() => {
      let timer = setInterval(() => {
        countdown.value--
        if (countdown.value <= 0) {
          clearInterval(timer)
          router.push('/main')
        }
      }, 1000)
    })

    return {
      countdown
    }
  }
})
</script>

<style lang="less" scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}
.img {
  width: 100%;
  height: 700px;
  background: url('../../assets/img/404.svg') no-repeat center center;
}

.tips {
  text-align: center;
  font-size: 24px;
  color: #55a543;
}
</style>

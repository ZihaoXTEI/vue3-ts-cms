<template>
  <div class="login-phone">
    <el-form label-width="60px" :model="phone">
      <el-form-item label="手机号" prop="num">
        <el-input v-model="phone.num" clearable></el-input>
      </el-form-item>
      <el-form-item label="验证码" prop="code">
        <el-input v-model="phone.code" clearable></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'

export default defineComponent({
  name: 'login-phone',
  setup() {
    const phone = reactive({
      num: '',
      code: ''
    })

    return {
      phone
    }
  }
})
</script>

<style lang="less"></style>

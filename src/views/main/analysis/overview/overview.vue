<template>
  <div class="overview">
    <my-card title="关于">
      <div class="text-left">
        该项目是基于 Vue3、Vuex、VueRouter、Element-Plus 、TypeScript、Echart5
        等后台系统解决方案。
      </div>
    </my-card>

    <my-card title="技术栈">
      <my-textlink :textData="technologyStack"></my-textlink>
    </my-card>

    <my-card title="项目结构">
      <my-code language="bash" :code="projectDir"></my-code>
    </my-card>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import { technologyStack, projectDir } from './config'

export default defineComponent({
  name: 'overview',
  setup() {
    return {
      technologyStack,
      projectDir
    }
  }
})
</script>

<style lang="less" scoped>
.overview {
  .text-left {
    text-align: left;
  }
}
</style>

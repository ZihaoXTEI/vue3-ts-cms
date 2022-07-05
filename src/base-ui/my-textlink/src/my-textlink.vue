<template>
  <div class="my-textlink">
    <template v-for="(item, index) in textData" :key="index">
      <div class="item">
        <span class="title">{{ item.title }}</span>
        <el-link type="primary">{{ item.link }}</el-link>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

import type { ITextData } from '../types'

export default defineComponent({
  name: 'my-textlink',
  props: {
    textData: {
      type: Array as PropType<ITextData[]>,
      required: true
    }
  },
  setup() {
    return {}
  }
})
</script>

<style lang="less" scoped>
.my-textlink {
  padding: 0 15px;
  margin-bottom: 40px;
  text-align: left;

  .item {
    margin: 5px;

    .title {
      position: relative;
      display: inline-block;
      margin-right: 20px;
    }

    .title::before {
      position: absolute;
      content: '';
      top: 40%;
      left: -15px;
      width: 5px;
      height: 5px;
      background: black;
      border-radius: 100%;
    }
  }
}
</style>

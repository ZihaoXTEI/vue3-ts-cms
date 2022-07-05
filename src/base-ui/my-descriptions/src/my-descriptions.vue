<template>
  <div class="my-descriptions">
    <el-descriptions :title="title" :column="column" border>
      <template v-for="(item, index) in descriptionData" :key="index">
        <el-descriptions-item :label="item.name">
          <el-tag>{{ item.description }}</el-tag>
        </el-descriptions-item>
      </template>
    </el-descriptions>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

import type { IDescriptionData } from '../types'

export default defineComponent({
  name: 'my-descriptions',
  props: {
    /**
     * 描述列表标题
     */
    title: {
      type: String,
      required: true
    },
    /**
     * 一行 Item 数量
     */
    column: {
      type: Number,
      default: 1
    },
    /**
     * 描述列表数据
     */
    descriptionData: {
      type: Array as PropType<IDescriptionData[]>,
      required: true
    }
  },
  setup() {
    return {}
  }
})
</script>

<style scoped>
.description {
  margin-bottom: 20px;
}
</style>

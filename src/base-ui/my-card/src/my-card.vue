<template>
  <el-card class="my-card">
    <template #header>
      <div class="card-header">
        <span>{{ title }}</span>
      </div>
    </template>

    <div class="item">
      <slot></slot>
    </div>
  </el-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'my-card',
  props: {
    title: {
      type: String,
      required: true
    }
  },
  setup() {
    return {}
  }
})
</script>

<style lang="less" scoped>
.my-card {
  margin-top: 10px;

  &:deep(.el-card__header) {
    padding: 10px 20px !important;
  }

  .card-header {
    display: flex;
    align-items: center;
    height: 30px;
    font-weight: 700;
  }

  .item {
    margin-bottom: 10px;
  }
}
</style>

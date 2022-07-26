<template>
  <div class="list">
    <el-timeline>
      <template v-for="(item, index) in storyList" :key="index">
        <el-timeline-item
          :timestamp="item.timestamp"
          placement="top"
          :type="item.type"
        >
          <el-card>
            <h4>{{ item.title }}</h4>
            <p>{{ item.content }}</p>
          </el-card>
        </el-timeline-item>
      </template>
    </el-timeline>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { storys } from './config/storys'

export default defineComponent({
  name: 'list',
  setup() {
    const storyList = reactive(storys)
    return {
      storyList
    }
  }
})
</script>

<style scoped>
.list {
  text-align: left;
  padding: 30px 0;
  padding-right: 30px;
}
</style>

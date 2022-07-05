<template>
  <div class="my-code"></div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'my-code',

  props: {
    language: {
      type: String,
      default: 'html'
    },
    code: {
      type: String,
      defualt: ''
    }
  },
  setup() {
    return {}
  }
})
</script>

<style lang="less" scoped>
.bg {
  padding: 10px;
  text-align: left;
  background: #f0f0f0;
}
</style>

<template>
  <div class="my-code">
    <pre class="bg">
      <code :class="'language' + language" v-html="highlightedCode"></code>
    </pre>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watchEffect } from 'vue'
import hljs from 'highlight.js'
import 'highlight.js/styles/github.css'

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
  setup(props) {
    const highlightedCode = ref<string>('')

    watchEffect(() => {
      if (props.code) {
        highlightedCode.value = hljs.highlight(props.code, {
          language: props.language
        }).value
      }
    })

    return { highlightedCode }
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

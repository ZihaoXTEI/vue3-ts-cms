<template>
  <div class="menu">
    <page-content
      ref="pageContentRef"
      :pageName="pageName"
      :pageTitle="pageTitle"
      :contentTableConfig="contentTableConfig"
    ></page-content>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

import PageContent from '@/components/page-content'

import { contentTableConfig } from './config/content.config'

export default defineComponent({
  name: 'my-menu',
  components: {
    PageContent
  },
  setup() {
    const pageName = ref('menu')
    const pageTitle = ref('菜单')

    return {
      pageName,
      pageTitle,

      contentTableConfig
    }
  }
})
</script>

<style scoped></style>

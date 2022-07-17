<template>
  <div class="category">
    <page-search
      :searchFormConfig="searchFormConfig"
      @resetBtnClick="handleResetBtnClick"
      @queryBtnClick="handleQueryBtnClick"
    ></page-search>

    <page-content
      ref="pageContentRef"
      :pageName="pageName"
      :moduleName="moduleName"
      :pageTitle="pageTitle"
      :contentTableConfig="contentTableConfig"
      @createBtnClick="handleCreateData"
      @editBtnClick="handleEditData"
    ></page-content>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'

import PageSearch from '@/components/page-search'
import PageContent from '@/components/page-content'

import { searchFormConfig } from './config/search.config'
import { contentTableConfig } from './config/content.config'

import { usePageSearch } from '@/hooks/usePageSearch'
import { usePageModal } from '@/hooks/usePageModal'

import { useStore } from '@/store'

export default defineComponent({
  name: 'category',
  components: {
    PageSearch,
    PageContent
  },
  setup() {
    const [pageContentRef, handleResetBtnClick, handleQueryBtnClick] =
      usePageSearch()

    const pageName = ref('category')
    const moduleName = ref('product')
    const pageTitle = ref('商品类别')

    const [pageModalRef, defaultInfo, handleCreateData, handleEditData] =
      usePageModal(undefined, undefined)

    return {
      pageName,
      moduleName,
      pageTitle,

      searchFormConfig,
      contentTableConfig,

      pageContentRef,

      handleResetBtnClick,
      handleQueryBtnClick,
      handleCreateData,
      handleEditData
    }
  }
})
</script>

<style scoped></style>

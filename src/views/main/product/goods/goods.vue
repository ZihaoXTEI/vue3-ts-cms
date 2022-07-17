<template>
  <div class="goods">
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
    >
      <template #imageSlot="scope">
        <el-image
          style="width: 50px; height: 50px"
          :src="scope.row.imgUrl"
          :preview-src-list="[scope.row.imgUrl]"
        >
        </el-image>
      </template>
    </page-content>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

import PageSearch from '@/components/page-search'
import PageContent from '@/components/page-content'

import { searchFormConfig } from './config/search.config'
import { contentTableConfig } from './config/content.config'

import { usePageSearch } from '@/hooks/usePageSearch'
import { usePageModal } from '@/hooks/usePageModal'
import { useStore } from '@/store'

export default defineComponent({
  name: 'goods',
  components: {
    PageSearch,
    PageContent
  },
  setup() {
    const [pageContentRef, handleResetBtnClick, handleQueryBtnClick] =
      usePageSearch()

    const pageName = ref('goods')
    const moduleName = ref('product')
    const pageTitle = ref('商品')

    const [pageModalRef, defaultInfo, handleCreateData, handleEditData] =
      usePageModal(undefined, undefined)

    return {
      pageName,
      moduleName,
      pageTitle,

      searchFormConfig,
      contentTableConfig,

      defaultInfo,

      pageContentRef,
      pageModalRef,

      handleResetBtnClick,
      handleQueryBtnClick,
      handleCreateData,
      handleEditData
    }
  }
})
</script>

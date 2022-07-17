<template>
  <div class="department">
    <page-search
      :searchFormConfig="searchFormConfig"
      @resetBtnClick="handleResetBtnClick"
      @queryBtnClick="handleQueryBtnClick"
    ></page-search>

    <page-content
      ref="pageContentRef"
      :pageName="pageName"
      :pageTitle="pageTitle"
      :contentTableConfig="contentTableConfig"
      @createBtnClick="handleCreateData"
      @editBtnClick="handleEditData"
    ></page-content>

    <page-modal
      ref="pageModalRef"
      :pageName="pageName"
      :pageTitle="pageTitle"
      :modalFormConfig="modalFormConfig"
      :defalutInfo="defaultInfo"
    ></page-modal>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'

import PageSearch from '@/components/page-search'
import PageContent from '@/components/page-content'
import PageModal from '@/components/page-modal'

import { searchFormConfig } from './config/search.config'
import { contentTableConfig } from './config/content.config'
import { modalConfig } from './config/modal.config'

import { usePageSearch } from '@/hooks/usePageSearch'
import { usePageModal } from '@/hooks/usePageModal'
import { useStore } from '@/store'

export default defineComponent({
  name: 'department',
  components: {
    PageSearch,
    PageContent,
    PageModal
  },
  setup() {
    const [pageContentRef, handleResetBtnClick, handleQueryBtnClick] =
      usePageSearch()

    const pageName = ref('department')
    const pageTitle = ref('部门')

    const store = useStore()
    const modalFormConfig = computed(() => {
      const parentIdItem = modalConfig.formItems?.find(
        (item) => item.field === 'parentId'
      )

      parentIdItem!.options = store.state.entireDepartment.map((item) => {
        return { title: item.name, value: item.id }
      })
      return modalConfig
    })

    const [pageModalRef, defaultInfo, handleCreateData, handleEditData] =
      usePageModal(undefined, undefined)

    return {
      pageName,
      pageTitle,

      searchFormConfig,
      contentTableConfig,
      modalFormConfig,

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

<style scoped></style>

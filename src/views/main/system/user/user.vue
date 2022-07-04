<template>
  <div class="user">
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
import { computed, defineComponent, ref } from 'vue'

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
  name: 'users',
  components: {
    PageSearch,
    PageContent,
    PageModal
  },
  setup() {
    const [pageContentRef, handleResetBtnClick, handleQueryBtnClick] =
      usePageSearch()

    const pageName = ref('users')
    const pageTitle = ref('用户')

    // page-modal的hook相关回调函数
    // 处理密码输入框逻辑
    const createCallback = () => {
      const passwordItem = modalConfig.formItems.find(
        (item) => item.field === 'password'
      )
      passwordItem!.isHidden = false
    }
    const editCallback = () => {
      const passwordItem = modalConfig.formItems.find(
        (item) => item.field === 'password'
      )
      passwordItem!.isHidden = true
    }

    const store = useStore()
    const modalFormConfig = computed(() => {
      const departMentItem = modalConfig.formItems.find(
        (item) => item.field === 'departmentId'
      )
      // 添加部门列表数据
      departMentItem!.options = store.state.entireDepartment.map((item) => ({
        title: item.name,
        value: item.id
      }))

      const roleItem = modalConfig.formItems.find(
        (item) => item.field === 'roleId'
      )
      // 添加角色列表数据
      roleItem!.options = store.state.entireRole.map((item) => ({
        title: item.name,
        value: item.id
      }))
      return modalConfig
    })

    const [pageModalRef, defaultInfo, handleCreateData, handleEditData] =
      usePageModal(createCallback, editCallback)

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

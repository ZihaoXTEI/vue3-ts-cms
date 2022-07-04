<template>
  <div class="role">
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
      :otherInfo="otherInfo"
    >
      <div class="menu-tree">
        <el-tree
          ref="elTreeRef"
          :data="menus"
          node-key="id"
          show-checkbox
          :props="{ children: 'children', label: 'name' }"
          @check="handleCheckChange"
        >
        </el-tree>
      </div>
    </page-modal>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, nextTick } from 'vue'
import { useStore } from '@/store'
import { menuMapLeafKeys } from '@/utils/map-menu'

import { ElTree } from 'element-plus'

import PageSearch from '@/components/page-search'
import PageContent from '@/components/page-content'
import PageModal from '@/components/page-modal'

import { searchFormConfig } from './config/search.config'
import { contentTableConfig } from './config/content.config'
import { modalFormConfig } from './config/modal.config'

import { usePageSearch } from '@/hooks/usePageSearch'
import { usePageModal } from '@/hooks/usePageModal'

export default defineComponent({
  name: 'role',
  components: {
    PageSearch,
    PageContent,
    PageModal
  },
  setup() {
    const [pageContentRef, handleResetBtnClick, handleQueryBtnClick] =
      usePageSearch()

    const pageName = ref('role')
    const pageTitle = ref('角色')

    // page-modal的hook相关回调函数
    // 处理El-Tree组件的数据
    const elTreeRef = ref<InstanceType<typeof ElTree>>()
    const editCallback = (item: any) => {
      const leafKeys = menuMapLeafKeys(item.menuList)

      nextTick(() => {
        elTreeRef.value?.setCheckedKeys(leafKeys, false)
      })
    }

    const store = useStore()
    const menus = computed(() => store.state.entireMenu)

    const otherInfo = ref({})
    const handleCheckChange = (firstData: any, secondData: any) => {
      const checkedKeys = secondData.checkedKeys
      const halfCheckedKeys = secondData.halfCheckedKeys
      const menuList = [...checkedKeys, ...halfCheckedKeys]
      otherInfo.value = { menuList }
    }

    const [pageModalRef, defaultInfo, handleCreateData, handleEditData] =
      usePageModal(undefined, editCallback)

    return {
      pageName,
      pageTitle,
      menus,
      otherInfo,

      searchFormConfig,
      contentTableConfig,
      modalFormConfig,

      defaultInfo,

      pageContentRef,
      pageModalRef,
      elTreeRef,

      handleResetBtnClick,
      handleQueryBtnClick,
      handleCreateData,
      handleEditData,
      handleCheckChange
    }
  }
})
</script>

<style scoped></style>

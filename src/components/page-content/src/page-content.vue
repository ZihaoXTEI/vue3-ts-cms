<template>
  <div class="page-content">
    <my-table
      :title="pageTitle"
      :listData="dataList"
      :listCount="dataCount"
      v-bind="contentTableConfig"
      v-model:pageInfo="pageInfo"
    >
      <template #header-handler>
        <el-button
          type="primary"
          size="medium"
          @click="handleCreateBtnClick"
          plain
          >创建{{ pageTitle }}</el-button
        >
      </template>

      <!-- 表格中的插槽 -->
      <!-- 状态列 -->
      <template #status="scope">
        <el-tag
          :type="scope.row.enable ? 'success' : 'danger'"
          effect="plain"
          round
        >
          {{ scope.row.enable ? '启用' : '禁用' }}
        </el-tag>
      </template>

      <!-- 创建日期列 -->
      <template #createAt="scope">
        <span>{{ $filters.formatUTCTime(scope.row.createAt) }}</span>
      </template>

      <!-- 更新日期列 -->
      <template #updateAt="scope">
        <span>{{ $filters.formatUTCTime(scope.row.updateAt) }}</span>
      </template>
      <!-- 操作（编辑/删除）列 -->
      <template #handler="scope">
        <div class="handler-btn">
          <el-button icon="Edit" size="mini" link @click="handleEditBtnClick">
            编辑
          </el-button>
          <el-button
            icon="Delete"
            size="mini"
            link
            @click="handleDeleteBtnClick"
          >
            删除
          </el-button>
        </div>
      </template>

      <!-- 其它动态插入的插槽 -->
      <template
        v-for="item in otherPropsSlots"
        :key="item.prop"
        #[item.slotName]="scope"
      >
        <template v-if="item.slotName">
          <slot :name="item.slotName" :row="scope.row"></slot>
        </template>
      </template>
    </my-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, computed } from 'vue'

import { useStore } from '@/store'

export default defineComponent({
  name: 'page-content',
  props: {
    /**
     * 页面路由名称（英文：user / role）
     */
    pageName: {
      type: String,
      required: true
    },
    /**
     * 页面标题（中文：用户、角色）
     */
    pageTitle: {
      type: String,
      default: '数据列表'
    },
    contentTableConfig: {
      type: Object,
      required: true
    }
  },
  emits: ['createBtnClick', 'editBtnClick'],
  setup(props, { emit }) {
    const store = useStore()

    // 获取操作权限

    // 双向绑定pageInfo
    const pageInfo = ref({ currentPage: 1, pageSize: 10 })
    watch(pageInfo, () => getPageData())

    // 发送网络请求获取表格数据
    const getPageData = (queryInfo: any = {}) => {
      store.dispatch('system/getPageListAction', {
        pageName: props.pageName,
        queryInfo: {
          offset: (pageInfo.value.currentPage - 1) * pageInfo.value.pageSize,
          size: pageInfo.value.pageSize,
          ...queryInfo
        }
      })
    }
    getPageData()

    // 获取列表数据
    const dataList = computed(() =>
      store.getters['system/getListData'](props.pageName)
    )
    const dataCount = computed(() =>
      store.getters['system/getListCount'](props.pageName)
    )

    // 筛选出其它动态插槽名称
    const otherPropsSlots = props.contentTableConfig?.propsList.filter(
      (item: any) => {
        switch (item.slotName) {
          case 'status':
            return false
          case 'createAt':
            return false
          case 'updateAt':
            return false
          case 'handler':
            return false
          default:
            return true
        }
      }
    )

    // 创建数据按钮点击事件
    const handleCreateBtnClick = () => {
      emit('createBtnClick')
    }

    // 修改数据按钮点击事件
    const handleEditBtnClick = (item: any) => {
      emit('editBtnClick', item)
    }

    // 删除数据按钮点击事件
    const handleDeleteBtnClick = (item: any) => {
      store.dispatch('system/deletePageDataAction', {
        pageName: props.pageName,
        id: item.id
      })
    }
    return {
      pageInfo,
      dataList,
      dataCount,
      otherPropsSlots,
      getPageData,
      handleCreateBtnClick,
      handleEditBtnClick,
      handleDeleteBtnClick
    }
  }
})
</script>

<style lang="less" scoped></style>

<template>
  <div class="page-content">
    <my-table
      :pageTitle="pageTitle"
      :listData="dataList"
      :listCount="dataCount"
      v-bind="contentTableConfig"
      v-model:pageInfo="pageInfo"
    >
      <template #header-handler>
        <el-button
          v-if="isCreate"
          type="primary"
          size="default"
          @click="handleCreateBtnClick"
          plain
          >创建{{ pageTitle }}</el-button
        >
      </template>

      <!-- 表格中的插槽 -->
      <!-- 状态列 -->
      <template #status="scope">
        <el-tag
          v-if="scope.row.enable != null"
          :type="scope.row.enable ? 'success' : 'danger'"
          effect="plain"
          round
        >
          {{ scope.row.enable ? '启用' : '禁用' }}
        </el-tag>

        <el-tag
          v-else-if="scope.row.status != null"
          :type="scope.row.status ? 'success' : 'danger'"
          effect="plain"
          round
        >
          {{ scope.row.status ? '启用' : '禁用' }}
        </el-tag>
      </template>

      <!-- 创建日期列 -->
      <template #createAt="scope">
        <span>{{ formatUTCString(scope.row.createAt) }}</span>
      </template>

      <!-- 更新日期列 -->
      <template #updateAt="scope">
        <span>{{ formatUTCString(scope.row.updateAt) }}</span>
      </template>

      <!-- 操作（编辑/删除）列 -->
      <template #handler="scope">
        <div class="handler-btn">
          <el-button
            v-if="isUpdate"
            icon="Edit"
            type="primary"
            link
            @click="handleEditBtnClick(scope.row)"
          >
            编辑
          </el-button>

          <el-popconfirm
            v-if="isDelete"
            confirm-button-text="确认"
            cancel-button-text="取消"
            icon="DeleteFilled"
            icon-color="#F56C6C"
            title="确定删除该条数据吗？"
            @confirm="handleDeleteBtnClick(scope.row)"
          >
            <template #reference>
              <el-button icon="Delete" type="danger" link> 删除 </el-button>
            </template>
          </el-popconfirm>
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

import { ElNotification } from 'element-plus'

import { formatUTCString } from '@/utils/date-format'
import { usePermission } from '@/hooks/usePermission'

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
     * VueX模块名称
     */
    moduleName: {
      type: String,
      default: 'system'
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
    const isCreate = usePermission(props.pageName, 'create')
    const isDelete = usePermission(props.pageName, 'delete')
    const isUpdate = usePermission(props.pageName, 'update')
    const isQuery = usePermission(props.pageName, 'query')

    // 双向绑定pageInfo
    const pageInfo = ref({ currentPage: 1, pageSize: 5 })
    watch(pageInfo, () => {
      getPageData()
    })

    // 发送网络请求获取表格数据
    const getPageData = (queryInfo: any = {}) => {
      if (!isQuery) return
      store.dispatch(`${props.moduleName}/getPageListAction`, {
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
      store.getters[`${props.moduleName}/getListData`](props.pageName)
    )
    const dataCount = computed(() =>
      store.getters[`${props.moduleName}/getListCount`](props.pageName)
    )

    // 筛选出其它动态插槽名称
    const otherPropsSlots = props.contentTableConfig?.columnData.filter(
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
      console.log(item)
      // store.dispatch(`${props.moduleName}/deletePageDataAction`, {
      //   pageName: props.pageName,
      //   id: item.id
      // })
      ElNotification({
        title: '成功',
        message: '删除成功',
        type: 'success'
      })
    }
    return {
      pageInfo,
      dataList,
      dataCount,
      otherPropsSlots,

      isCreate,
      isDelete,
      isUpdate,
      isQuery,

      getPageData,
      handleCreateBtnClick,
      handleEditBtnClick,
      handleDeleteBtnClick,
      formatUTCString
    }
  }
})
</script>

<style lang="less" scoped>
.page-content {
  margin-top: 10px;
}
</style>

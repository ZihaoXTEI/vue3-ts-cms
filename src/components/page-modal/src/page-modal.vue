<template>
  <div class="page-modal">
    <el-dialog
      :title="pageTitle"
      v-model="dialogVisible"
      width="30%"
      center
      destroy-on-close
    >
      <!-- 表单区域 -->
      <my-form v-bind="modalFormConfig" v-model="formData"></my-form>
      <!-- 默认插槽 -->
      <slot></slot>
      <!-- 底部按钮 -->
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleConfirmBtnClick">
            确 定
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { useStore } from '@/store'
import { defineComponent, ref, watch } from 'vue'

export default defineComponent({
  name: 'page-modal',
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
      default: '操作'
    },
    /**
     * 表单配置信息
     */
    modalFormConfig: {
      type: Object,
      required: true
    },
    defalutInfo: {
      type: Object,
      default: () => ({})
    },
    otherInfo: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props) {
    // 控制对话框隐藏与显示
    const dialogVisible = ref(false)
    const formData = ref<any>({})

    watch(
      () => props.defalutInfo,
      (newValue) => {
        for (const item of props.modalFormConfig.formItems) {
          formData.value[`${item.field}`] = newValue[`${item.field}`]
        }
      }
    )

    // 确定按钮事件
    const store = useStore()
    const handleConfirmBtnClick = () => {
      // 隐藏对话框
      dialogVisible.value = false
      if (Object.keys(props.defalutInfo).length) {
        // 编辑数据逻辑
        store.dispatch('system/editPageDataAction', {
          pageName: props.pageName,
          editData: { ...formData.value, ...props.otherInfo },
          id: props.defalutInfo.id
        })
      } else {
        // 创建数据逻辑
        store.dispatch('system/createPageDataAction', {
          pageName: props.pageName,
          createData: { ...formData.value, ...props.otherInfo }
        })
      }
    }
    return {
      dialogVisible,
      formData,
      handleConfirmBtnClick
    }
  }
})
</script>

<style lang="less" scoped></style>

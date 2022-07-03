<template>
  <div class="page-search">
    <el-card class="my-form">
      <!-- 标题 -->
      <template #header>
        <div class="card-header">
          <span>高级检索</span>
        </div>
      </template>
      <my-form v-bind="searchFormConfig" v-model="formData">
        <template #footer>
          <div class="footer-btn">
            <el-button icon="RefreshLeft" @click="handleResetBtnClick"
              >重置</el-button
            >
            <el-button
              type="primary"
              plain
              icon="Search"
              @click="handleQueryBtnClick"
              >搜索</el-button
            >
          </div>
        </template>
      </my-form>
    </el-card>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'page-search',
  props: {
    searchFormConfig: {
      type: Object,
      required: true
    }
  },
  emits: ['resetBtnClick', 'queryBtnClick'],
  setup(props, { emit }) {
    const formItems = props.searchFormConfig?.formItems ?? []
    // 保存表单原始数据（表单置空时候使用）
    const formOriginData: any = {}
    formItems.forEach((item: any) => {
      formOriginData[item.field] = ''
    })
    // 表单数据
    const formData = ref(formOriginData)

    // 重置按钮事件
    const handleResetBtnClick = () => {
      formData.value = formOriginData
      emit('resetBtnClick')
    }

    // 查询按钮点击事件
    const handleQueryBtnClick = () => {
      emit('queryBtnClick', formData.value)
    }

    return {
      formData,
      handleResetBtnClick,
      handleQueryBtnClick
    }
  }
})
</script>

<style lang="less" scoped>
.page-search {
  .card-header {
    display: flex;
    font-weight: 700;
  }
  .footer-btn {
    text-align: right;
    padding: 0 40px 20px 0;
  }
}
</style>

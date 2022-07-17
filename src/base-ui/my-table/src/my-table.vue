<template>
  <el-card>
    <!-- 头部区域 -->
    <div class="header">
      <slot name="header">
        <!-- 左侧标题 -->
        <div class="title">{{ pageTitle }}数据列表</div>
        <!-- 右侧按钮区 -->
        <div class="handler">
          <slot name="header-handler"></slot>
        </div>
      </slot>
    </div>
    <!-- 表格区域 -->
    <el-table
      :data="listData"
      @selection-change="handleSelectionChange"
      v-bind="elTableProps"
      border
      style="width: 100%"
    >
      <!-- 是否显示选择框列 -->
      <el-table-column
        v-if="showSelectColumn"
        type="selection"
        align="center"
        width="60"
      >
      </el-table-column>
      <!-- 是否显示索引值列 -->
      <el-table-column
        v-if="showIndexColumn"
        type="index"
        label="序号"
        align="center"
        width="80"
      ></el-table-column>

      <!-- 表格数据 -->
      <template v-for="column in columnData" :key="column.prop">
        <el-table-column v-bind="column" show-overflow-tooltip align="center">
          <template #default="scope">
            <slot :name="column.slotName" :row="scope.row">
              {{ scope.row[column.prop] }}
            </slot>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <!-- 底部区域 -->
    <div class="footer" v-if="showFooter">
      <slot name="footer">
        <!-- <el-pagination
          :current-page="pageInfo.currentPage"
          :page-size="pageInfo.pageSize"
          :page-sizes="[10, 20, 30]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="listCount"
          @size-change="handleSizeChange"
          @current-chnage="handleCurrentChange"
        >
        </el-pagination> -->
        <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :page-sizes="[5, 10, 15, 20]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="listCount"
          class="pagination"
        />
      </slot>
    </div>
  </el-card>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, watch } from 'vue'
import type { IColumnData } from '../types'

export default defineComponent({
  name: 'my-table',
  props: {
    /**
     * 头部标题（中文）
     */
    pageTitle: {
      type: String,
      default: '表格'
    },
    /**
     * 页面名称（英文）
     */
    // pageName: {
    //   type: String,
    //   required: true
    // },
    /**
     * 表格数据
     */
    listData: {
      type: Array,
      required: true
    },
    /**
     * 数据总条数
     */
    listCount: {
      type: Number,
      default: 0
    },
    /**
     * 每列数据内容
     */
    columnData: {
      type: Array as PropType<IColumnData[]>,
      required: true
    },
    /**
     * 是否每行显示选择框
     */
    showSelectColumn: {
      type: Boolean,
      default: false
    },
    /**
     * 是否每行显示索引值
     */
    showIndexColumn: {
      type: Boolean,
      default: false
    },
    /**
     * 分页数据
     */
    pageInfo: {
      type: Object,
      default: () => ({ currentPage: 0, pageSize: 10 })
    },
    /**
     * El-Table其他属性
     */
    elTableProps: {
      type: Object,
      default: () => ({})
    },
    /**
     * 是否显示底部
     */
    showFooter: {
      type: Boolean,
      default: true
    }
  },
  emits: ['selectionChange', 'update:pageInfo'],
  setup(props, { emit }) {
    const handleSelectionChange = (value: any) => {
      emit('selectionChange', value)
    }

    // 新版建议===》使用v-model双向绑定currentPage、pageSize
    /*     const handleCurrentChange = (currentPage: number) => {
      emit('update:pageInfo', { ...props.pageInfo, currentPage })
    }
    const handleSizeChange = (pageSize: number) => {
      emit('update:pageInfo', { ...props.pageInfo, pageSize })
    } */

    const currentPage = ref(props.pageInfo.currentPage)
    const pageSize = ref(props.pageInfo.pageSize)

    watch(currentPage, (currentPage) => {
      emit('update:pageInfo', { ...props.pageInfo, currentPage })
    })
    watch(pageSize, (pageSize) => {
      emit('update:pageInfo', { ...props.pageInfo, pageSize })
    })

    return {
      currentPage,
      pageSize,
      handleSelectionChange
    }
  }
})
</script>

<style lang="less" scoped>
.header {
  display: flex;
  height: 48px;
  padding: 0 0;
  justify-content: space-between;
  align-items: center;

  .title {
    font-size: 20px;
    font-weight: 700;
  }
  .handler {
    align-items: center;
  }
}

.footer {
  margin-top: 15px;

  .pagination {
    display: flex;
    justify-content: flex-end;
  }
}

// 解决 el-table el-table-column 组件中 使用插槽 加载 el-image 组件预览图片 层级过低问题
// https://blog.csdn.net/weixin_43245095/article/details/123246885

.el-table {
  & ::v-deep th.el-table__cell,
  ::v-deep td.el-table__cell {
    // 设置position 使得 子元素不与其产生新的层叠关系
    position: static;
  }
}
</style>

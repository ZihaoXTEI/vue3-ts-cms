import { ref } from 'vue'

import PageContent from '@/components/page-content'

export function usePageSearch(): any {
  const pageContentRef = ref<InstanceType<typeof PageContent>>()

  // 重置按钮触发事件
  const handleResetBtnClick = () => {
    pageContentRef.value?.getPageData()
  }

  // 条件查询按钮触发事件
  const handleQueryBtnClick = (queryInfo: any) => {
    pageContentRef.value?.getPageData(queryInfo)
  }
  return [pageContentRef, handleResetBtnClick, handleQueryBtnClick]
}

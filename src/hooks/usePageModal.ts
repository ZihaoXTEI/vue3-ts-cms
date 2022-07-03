import { ref } from 'vue'
import PageModal from '@/components/page-modal'

type CallbackFn = (item?: any) => void

export function usePageModal(
  createCallback?: CallbackFn,
  editCallback?: CallbackFn
): any {
  const pageModalRef = ref<InstanceType<typeof PageModal>>()
  // 表单初始化数据
  const defaultInfo = ref({})

  // 创建数据
  const handleCreateData = () => {
    defaultInfo.value = {}
    if (pageModalRef.value) {
      pageModalRef.value.dialogVisible = true
    }
    createCallback && createCallback()
  }

  // 编辑数据
  const handleEditData = (item: any) => {
    defaultInfo.value = { ...item }
    if (pageModalRef.value) {
      pageModalRef.value.dialogVisible = true
    }
    editCallback && editCallback(item)
  }

  return [pageModalRef, defaultInfo, handleCreateData, handleEditData]
}

import { useStore } from '@/store'

// 权限获取
export function usePermission(pageName: string, handleName: string) {
  const store = useStore()

  const permissions = store.state.login.permissions
  const verifyPermission = `system:${pageName}:${handleName}`

  return Boolean(permissions.find((item) => item === verifyPermission))
}

import { useStore } from '@/store'

export default function usePermission(
  pageName: string,
  handlerName: string
): boolean {
  const store = useStore()
  const permissions = store.state.loginModule.permissions
  return !!permissions.find((permission) => {
    return permission === `system:${pageName}:${handlerName}`
  })
}

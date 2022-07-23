import { IBreadcrumb } from '@/base-ui/breadcrumbs/src/types'
import { RouteRecordRaw } from 'vue-router'

export let firstRoute: any = null

// 生成动态路由
export function mapMenusToRoutes(userMenus: any[]): RouteRecordRaw[] {
  const routes: RouteRecordRaw[] = []
  // 默认加载全部的路由但不注册
  const allRoutes: RouteRecordRaw[] = []
  // 导入 在../router/main下 递归 查找所有.ts文件
  const routesFiles = require.context('../../router/main', true, /\.ts/)
  routesFiles.keys().forEach((key) => {
    const router = require('../../router/main' + key.slice(1))
    allRoutes.push(router.default)
  })
  // 根据权限查找需要注册的路由
  const _recurseGetRoute = (menus: any[]) => {
    // 遍历
    for (const menu of menus) {
      // 筛选没有子菜单的找到它的路由
      if (menu.type === 2) {
        const route = allRoutes.find((route) => route.path === menu.url)
        if (route) routes.push(route)
        if (!firstRoute) firstRoute = menu.url
      } else {
        // 筛选有子菜单的菜单 继续递归
        _recurseGetRoute(menu.children)
      }
    }
  }

  _recurseGetRoute(userMenus)

  return routes
}

// 根据url查询菜单

export function mapPathToMenu(userMenus: any[], path: string): IBreadcrumb[] {
  const breadcrumbs: IBreadcrumb[] = []

  const _recurseGetMenu = (menus: any[], path: string): any => {
    // debugger
    for (const menu of menus) {
      if (menu.type === 2 && menu.url === path) {
        return menu
      } else if (menu.type === 1) {
        const nextResult = _recurseGetMenu(menu.children, path)
        if (nextResult) {
          breadcrumbs.push({ name: menu.name })
          breadcrumbs.push({ name: nextResult.name })
          return nextResult
        }
      }
    }
  }

  _recurseGetMenu(userMenus, path)

  return breadcrumbs
}

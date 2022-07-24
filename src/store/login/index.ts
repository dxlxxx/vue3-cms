import {
  accountLoginRequest,
  requestUserInfoById,
  requestUserMenusByRoleId
} from '@/service/login'
import { IAccount } from '@/service/login/type'
import { localCache, mapMenusToRoutes, mapMenuToPermissions } from '@/utils'
import { Module } from 'vuex'
import IRootState from '../type'
import ILoginState from './types'
import router from '@/router'

const loginModule: Module<ILoginState, IRootState> = {
  namespaced: true,
  state() {
    return {
      token: '',
      userInfo: {},
      userMenus: [],
      permissions: []
    }
  },
  mutations: {
    changeToken(state, token: string) {
      state.token = token
      localCache.setCache('token', token)
    },
    changeUserInfo(state, userInfo: any) {
      state.userInfo = userInfo
      localCache.setCache('userInfo', userInfo)
    },
    changeUserMenus(state, userMenus: any) {
      state.userMenus = userMenus
      localCache.setCache('userMenus', userMenus)
      const routes = mapMenusToRoutes(userMenus)
      // 动态注册路由
      routes.forEach((route) => router.addRoute('main', route))
      // 权限
      state.permissions = mapMenuToPermissions(userMenus)
    }
  },
  actions: {
    // 登录并保存token
    accountLoginAction: async ({ commit }, payload: IAccount) => {
      const loginResult = await accountLoginRequest(payload)
      const { id, token } = loginResult.data
      commit('changeToken', token)
      // 保存用户信息
      const userResult = await requestUserInfoById(id)
      const userInfo = userResult.data
      const roleId = userInfo.role.id
      commit('changeUserInfo', userInfo)
      // 请求用户菜单
      const userMenus = await requestUserMenusByRoleId(roleId)
      commit('changeUserMenus', userMenus.data)
      // 跳转
      router.push('/main')
    },
    _initLoginState: ({ commit }) => {
      const token = localCache.getCache('token')
      const userInfo = localCache.getCache('userInfo')
      const userMenus = localCache.getCache('userMenus')
      if (token) {
        commit('changeToken', token)
      }
      if (userInfo) {
        commit('changeUserInfo', userInfo)
      }
      if (userMenus) {
        commit('changeUserMenus', userMenus)
      }
    }
  }
}

export default loginModule

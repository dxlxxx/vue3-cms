import {
  createPageData,
  deletePageData,
  editPageData,
  getPageList
} from '@/service/main/system'
import { firstUpperCase } from '@/utils'
import { Module } from 'vuex'
import IRootState from '../type'
import mapPageName from './map-pageName'
import { ISystemState } from './types'

const systemModule: Module<ISystemState, IRootState> = {
  namespaced: true,
  state() {
    return {
      usersList: [],
      usersCount: 0,
      roleList: [],
      roleCount: 0,
      goodsList: [],
      goodsCount: 0,
      menuList: [],
      menuCount: 0
    }
  },
  mutations: {
    changeUsersList: (state, usersList: any[]) => {
      state.usersList = usersList
    },
    changeUsersCount: (state, usersCount: number) => {
      state.usersCount = usersCount
    },
    changeRoleList: (state, roleList: any[]) => {
      state.roleList = roleList
    },
    changeRoleCount: (state, roleCount: number) => {
      state.roleCount = roleCount
    },
    changeGoodsList: (state, goodsList: any[]) => {
      state.goodsList = goodsList
    },
    changeGoodsCount: (state, goodsCount: number) => {
      state.goodsCount = goodsCount
    },
    changeMenuList: (state, menuList: any[]) => {
      state.menuList = menuList
    },
    changeMenuCount: (state, menuCount: number) => {
      state.menuCount = menuCount
    }
  },
  actions: {
    getPageListAction: async ({ commit }, payload) => {
      const pageName: string = payload.pageName
      const url: string = (mapPageName as any)[pageName]
      const result = await getPageList(url, payload.queryInfo)
      commit(`change${firstUpperCase(pageName)}List`, result.data.list)
      commit(`change${firstUpperCase(pageName)}Count`, result.data.totalCount)
    },
    deletePageDataAction: async ({ dispatch }, payload) => {
      const { pageName, id } = payload
      const url = `/${pageName}/${id}`
      await deletePageData(url)
      dispatch('getPageListAction', {
        pageName,
        queryInfo: {
          offset: 0,
          size: 10
        }
      })
    },
    createPageDataAction: async ({ dispatch }, payload: any) => {
      // 1.创建数据的请求
      const { pageName, newData } = payload
      const pageUrl = `/${pageName}`
      await createPageData(pageUrl, newData)

      // 2.请求最新的数据
      dispatch('getPageListAction', {
        pageName,
        queryInfo: {
          offset: 0,
          size: 10
        }
      })
    },
    editPageDataAction: async ({ dispatch }, payload: any) => {
      // 1.编辑数据的请求
      const { pageName, editData, id } = payload
      const pageUrl = `/${pageName}/${id}`
      await editPageData(pageUrl, editData)

      // 2.请求最新的数据
      dispatch('getPageListAction', {
        pageName,
        queryInfo: {
          offset: 0,
          size: 10
        }
      })
    }
  }
}

export default systemModule

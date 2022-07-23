import { getPageList } from '@/service/main/system'
import { firstUpperCase } from '@/utils'
import { Module } from 'vuex'
import IRootState from '../type'
import mapPageName from './map-pageName'
import { ISystemState } from './types'

const systemModule: Module<ISystemState, IRootState> = {
  namespaced: true,
  state() {
    return {
      userList: [],
      userCount: 0,
      roleList: [],
      roleCount: 0
    }
  },
  mutations: {
    changeUserList: (state, userList: any[]) => {
      state.userList = userList
    },
    changeUserCount: (state, userCount: number) => {
      state.userCount = userCount
    },
    changeRoleList: (state, roleList: any[]) => {
      state.roleList = roleList
    },
    changeRoleCount: (state, roleCount: number) => {
      state.roleCount = roleCount
    }
  },
  actions: {
    getPageListAction: async ({ commit }, payload) => {
      const pageName: string = payload.pageName
      const url: string = (mapPageName as any)[pageName]
      const result = await getPageList(url, payload.queryInfo)
      commit(`change${firstUpperCase(pageName)}List`, result.data.list)
      commit(`change${firstUpperCase(pageName)}Count`, result.data.totalCount)
    }
  }
}

export default systemModule

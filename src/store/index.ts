import { InjectionKey } from 'vue'
import { createStore, useStore as baseUseStore, Store } from 'vuex'
import IRootState, { IUseStore } from './type'
import loginModule from './login'
import systemModule from './system'
import dashboardModule from './analysis'
import { getPageList } from '@/service/main/system'

export const key: InjectionKey<Store<IUseStore>> = Symbol()

const store = createStore<IRootState>({
  state() {
    return {
      entireDepartment: [],
      entireRole: [],
      entireMenu: []
    }
  },
  getters: {},
  mutations: {
    changeEntireDepartment(state, list) {
      state.entireDepartment = list
    },
    changeEntireRole(state, list) {
      state.entireRole = list
    },
    changeEntireMenu(state, list) {
      state.entireMenu = list
    }
  },
  actions: {
    getInitialDataAction: async ({ commit }) => {
      // 1.请求部门和角色数据
      const departmentResult = await getPageList('/department/list', {
        offset: 0,
        size: 1000
      })

      const { list: departmentList } = departmentResult.data
      const roleResult = await getPageList('/role/list', {
        offset: 0,
        size: 1000
      })
      const { list: roleList } = roleResult.data

      const menuResult = await getPageList('/menu/list', {
        offset: 0,
        size: 1000
      })
      const { list: menuList } = menuResult.data

      // 2.保存数据
      commit('changeEntireDepartment', departmentList)
      commit('changeEntireRole', roleList)
      commit('changeEntireMenu', menuList)
    }
  },
  modules: {
    loginModule,
    systemModule,
    dashboardModule
  }
})

export function _initState() {
  store.dispatch('loginModule/_initLoginState')
}

// 定义自己的 `useStore` 组合式函数
export function useStore() {
  return baseUseStore(key)
}

export default store

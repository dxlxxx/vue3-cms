import { InjectionKey } from 'vue'
import { createStore, useStore as baseUseStore, Store } from 'vuex'
import IRootState, { IUseStore } from './type'
import loginModule from './login'
import systemModule from './system'

export const key: InjectionKey<Store<IUseStore>> = Symbol()

const store = createStore<IRootState>({
  state() {
    return {
      name: 'dxl'
    }
  },
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    loginModule,
    systemModule
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

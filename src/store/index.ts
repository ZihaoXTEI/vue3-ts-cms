import { createStore, Store, useStore as useVuexStore } from 'vuex'

import login from './login/login'

import type { IRootState, IStoreType } from './type'

const store = createStore<IRootState>({
  state() {
    return {
      name: 'cikao'
    }
  },
  modules: {
    login
  }
})

export default store

export function setupStore() {
  store.dispatch('login/loadLocalCache')
}

export function useStore(): Store<IStoreType> {
  return useVuexStore()
}

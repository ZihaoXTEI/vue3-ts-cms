import { createStore } from 'vuex'

import login from './login/login'

import { IRootState } from './type'

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

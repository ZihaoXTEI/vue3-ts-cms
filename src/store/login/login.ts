import { Module } from 'vuex'

import router from '@/router'

import {
  accountLoginRequest,
  getUserInfoById,
  getUserMenusByRoleId
} from '@/service/login/login'
import localCache from '@/utils/localcache'

import type { ILoginState } from './type'
import type { IRootState } from '../type'
import type { IAccount } from '@/service/login/type'

const loginModule: Module<ILoginState, IRootState> = {
  namespaced: true,
  state() {
    return {
      token: '',
      userInfo: {},
      userMenus: []
    }
  },
  mutations: {
    changeToken(state, token: string) {
      state.token = token
    },

    changeUserInfo(state, userInfo: any) {
      state.userInfo = userInfo
    },

    changeUserMenus(state, userMenus: any) {
      state.userMenus = userMenus
    }
  },
  actions: {
    async accountLoginAction({ commit }, payload: IAccount) {
      try {
        // 用户登录
        const loginResult = await accountLoginRequest(payload)
        const { id, token } = loginResult.data
        commit('changeToken', token)
        localCache.setCache('token', token)

        // 请求用户信息
        const userInfoResult = await getUserInfoById(id)
        const userInfo = userInfoResult.data
        commit('changeUserInfo', userInfo)
        localCache.setCache('userinfo', userInfo)

        // 请求用户菜单
        const userMenusResult = await getUserMenusByRoleId(userInfo.role.id)
        const userMenus = userMenusResult.data
        commit('changeUserMenus', userMenus)
        localCache.setCache('usermenus', userMenus)

        // 跳到首页
        router.push('/main')
      } catch {
        localCache.clearCache()
        console.log('登录错误，请联系管理员')
      }
    },

    // 读取本地存储用户数据
    loadLocalCache({ commit }) {
      const token = localCache.getCache('token')
      if (token) {
        commit('changeToken', token)
      }

      const userInfo = localCache.getCache('userinfo')
      if (userInfo) {
        commit('changeUserInfo', userInfo)
      }

      const userMenus = localCache.getCache('usermenus')
      if (userMenus) {
        commit('changeUserMenus', userMenus)
      }
    }
  },
  getters: {}
}

export default loginModule

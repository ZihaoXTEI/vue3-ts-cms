import { Module } from 'vuex'

import router from '@/router'

import {
  accountLoginRequest,
  getUserInfoById,
  getUserMenusByRoleId
} from '@/service/login/login'
import localCache from '@/utils/localcache'
import { mapMenuToRoutes } from '@/utils/map-menu'

import type { ILoginState } from './type'
import type { IRootState } from '../type'
import type { IAccount } from '@/service/login/type'

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
    },

    changeUserInfo(state, userInfo: any) {
      state.userInfo = userInfo
    },

    changeUserMenus(state, userMenus: any) {
      state.userMenus = userMenus

      // 根据菜单信息生成对应的路由表信息
      const routes = mapMenuToRoutes(userMenus)

      // 将生成的 routes 加入至路由表 mian 页面的children下
      routes.forEach((route) => {
        router.addRoute('main', route)
      })

      // 根据菜单信息生成权限内容
    }
  },
  actions: {
    async accountLoginAction({ commit, dispatch }, payload: IAccount) {
      try {
        // 用户登录
        const loginResult = await accountLoginRequest(payload)
        const { id, token } = loginResult.data
        commit('changeToken', token)
        localCache.setCache('token', token)

        // 初始化数据请求：获取所有部门、菜单、角色数据
        dispatch('getInitialDataAction', null, { root: true })

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
    loadLocalCache({ commit, dispatch }) {
      const token = localCache.getCache('token')
      if (token) {
        commit('changeToken', token)
        // 初始化数据请求：获取所有部门、菜单、角色数据
        dispatch('getInitialDataAction', null, { root: true })
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

import { Module } from 'vuex'
import { IRootState } from '@/store/type'
import type { ISystemState } from './type'

import {
  getPageListData,
  deletePageData,
  createPageData,
  editPageData
} from '@/service/main/system/system'

const systemModule: Module<ISystemState, IRootState> = {
  namespaced: true,
  state() {
    return {
      usersList: [],
      usersCount: 0,
      roleList: [],
      roleCount: 0,
      menuList: [],
      menuCount: 0
    }
  },
  mutations: {
    changeUsersList(state, list: any[]) {
      state.usersList = list
    },
    changeUsersCount(state, count: number) {
      state.usersCount = count
    },

    changeRoleList(state, list: any[]) {
      state.roleList = list
    },
    changeRoleCount(state, count: number) {
      state.roleCount = count
    },

    changeMenuList(state, list: any[]) {
      state.menuList = list
    },
    changeMenusCount(state, count: number) {
      state.menuCount = count
    }
  },
  actions: {
    // 获取页面数据并存储至 store 中
    async getPageListAction({ commit }, payload: any) {
      // 获取页面URL
      const pageName: string = payload.pageName
      const pageURL = `/${pageName}/list`

      // 发送网络请求
      const pageResult = await getPageListData(pageURL, payload.queryInfo)
      const { list, totalCount } = pageResult.data

      // 修改页面名称（首字母大写）
      const changePageName =
        pageName.slice(0, 1).toUpperCase() + pageName.slice(1)
      // 数据存储至 store 中
      commit(`change${changePageName}List`, list)
      commit(`change${changePageName}Count`, totalCount)
    },

    // 新建数据并重新获取对应页面数据
    async createPageDataAction({ dispatch }, payload: any) {
      const { pageName, createData } = payload
      const pageURL = `/${pageName}`

      await createPageData(pageURL, createData)

      // 重新获取对应页面数据
      dispatch('getPageListAction', {
        pageName,
        queryInfo: {
          offset: 0,
          size: 10
        }
      })
    },

    // 编辑数据并重新获取对应页面数据
    async editPageDataAction({ dispatch }, payload: any) {
      const { pageName, id, editData } = payload
      const pageURL = `/${pageName}/`

      await editPageData(pageURL, id, editData)

      // 重新获取对应页面数据
      dispatch('getPageListAction', {
        pageName,
        queryInfo: {
          offset: 0,
          size: 10
        }
      })
    },

    // 删除数据并重新获取对应页面数据
    async deletePageDataAction({ dispatch }, payload: any) {
      const { pageName, id } = payload
      const pageURL = `/${pageName}/`

      await deletePageData(pageURL, id)

      // 重新获取对应页面数据
      dispatch('getPageListAction', {
        pageName,
        queryInfo: {
          offset: 0,
          size: 10
        }
      })
    }
  },
  getters: {
    // 根据页面名称获取对应列表数据
    getListData(state) {
      return (pageName: string) => {
        return (state as any)[`${pageName}List`]
      }
    },

    // 根据页面名称获取对应列表数据总条数
    getListCount(state) {
      return (pageName: string) => {
        return (state as any)[`${pageName}Count`]
      }
    }
  }
}

export default systemModule

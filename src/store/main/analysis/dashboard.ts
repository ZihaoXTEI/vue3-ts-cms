import { Module } from 'vuex'

import {
  getAmountList,
  getCategoryGoodsCount,
  getCategoryGoodsSale,
  getCategoryGoodsFavor,
  getAddressGoodsSale
} from '@/service/main/analysis/dashboard'

import type { IDashboardState } from './type'
import { IRootState } from '@/store/type'

const dashboardModule: Module<IDashboardState, IRootState> = {
  namespaced: true,
  state() {
    return {
      topPanelData: [],
      categoryGoodsCount: [],
      categoryGoodsSale: [],
      categoryGoodsFavor: [],
      addressGoodsSale: []
    }
  },
  mutations: {
    changeTopPanelData(state, list) {
      state.topPanelData = list
    },

    changeCategoryGoodsCount(state, list) {
      state.categoryGoodsCount = list
    },

    changeCategoryGoodsSale(state, list) {
      state.categoryGoodsSale = list
    },

    changeCategoryGoodsFavor(state, list) {
      state.categoryGoodsFavor = list
    },

    changeAddressGoodsSale(state, list) {
      state.addressGoodsSale = list
    }
  },
  actions: {
    // 获取顶部统计数据
    async getTopPanelDataAction({ commit }) {
      const result = await getAmountList()
      commit('changeTopPanelData', result.data)
    },

    // 获取图表数据
    async getDashboardEchartsAction({ commit }) {
      const [
        categoryGoodsCountResult,
        categoryGoodsSaleResult,
        changeCategoryGoodsFavorResult,
        changeAddressGoodsSaleResult
      ] = await Promise.all([
        getCategoryGoodsCount(),
        getCategoryGoodsSale(),
        getCategoryGoodsFavor(),
        getAddressGoodsSale()
      ])

      commit('changeCategoryGoodsCount', categoryGoodsCountResult.data)
      commit('changeCategoryGoodsSale', categoryGoodsSaleResult.data)
      commit('changeCategoryGoodsFavor', changeCategoryGoodsFavorResult.data)
      commit('changeAddressGoodsSale', changeAddressGoodsSaleResult.data)
    }
  }
}

export default dashboardModule

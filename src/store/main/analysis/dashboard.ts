import { Module } from 'vuex'

import {
  getCategoryGoodsCount,
  getCategoryGoodsSale,
  getCategoryGoodsFavor,
  getAddressGoodsSale
} from '@/service/main/analysis/dashboard'

import { IDashboardState } from './type'
import { IRootState } from '@/store/type'

const dashboardModule: Module<IDashboardState, IRootState> = {
  namespaced: true,
  state() {
    return {
      categoryGoodsCount: [],
      categoryGoodsSale: [],
      categoryGoodsFavor: [],
      addressGoodsSale: []
    }
  },
  mutations: {
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

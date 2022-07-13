<template>
  <div class="dashboard">
    <!-- 顶部数据统计区域 -->
    <el-row :gutter="10">
      <template v-for="item in topPanelData" :key="item.title">
        <el-col :md="12" :lg="6" :xl="6">
          <statistical-panel :panelData="item"></statistical-panel>
        </el-col>
      </template>
    </el-row>

    <!-- 统计图标区域 -->
    <el-row :gutter="10">
      <el-col :span="7">
        <my-card title="分类商品数量(饼图)">
          <pie-echarts :pieData="categoryGoodsCount"></pie-echarts>
        </my-card>
      </el-col>
      <el-col :span="10">
        <my-card title="不同城市商品销量">
          <map-echarts :mapData="addressGoodsSale"></map-echarts>
        </my-card>
      </el-col>
      <el-col :span="7">
        <my-card title="分类商品数量(玫瑰图)">
          <rose-echarts :roseData="categoryGoodsCount"></rose-echarts>
        </my-card>
      </el-col>
    </el-row>

    <el-row :gutter="10" class="content-row">
      <el-col :span="12">
        <my-card title="分类商品的销量">
          <line-echarts v-bind="categoryGoodsSale"></line-echarts>
        </my-card>
      </el-col>
      <el-col :span="12">
        <my-card title="分类商品的收藏">
          <bar-echarts v-bind="categoryGoodsFavor"></bar-echarts>
        </my-card>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from '@/store'

import {
  PieEcharts,
  RoseEcharts,
  LineEcharts,
  BarEcharts,
  MapEcharts
} from '@/components/page-echarts'

import StatisticalPanel from '@/components/statistical-panel'

export default defineComponent({
  name: 'dashboard',
  components: {
    StatisticalPanel,
    PieEcharts,
    RoseEcharts,
    LineEcharts,
    BarEcharts,
    MapEcharts
  },
  setup() {
    const store = useStore()
    // 请求数据
    store.dispatch('dashboard/getTopPanelDataAction')
    store.dispatch('dashboard/getDashboardEchartsAction')

    // 获取顶部统计数据
    const topPanelData = computed(() => store.state.dashboard.topPanelData)

    // 获取数据
    const categoryGoodsCount = computed(() => {
      return store.state.dashboard.categoryGoodsCount.map((item: any) => {
        return { name: item.name, value: item.goodsCount }
      })
    })
    const categoryGoodsSale = computed(() => {
      const xLabels: string[] = []
      const values: any[] = []
      const categoryGoodsSale = store.state.dashboard.categoryGoodsSale
      for (const item of categoryGoodsSale) {
        xLabels.push(item.name)
        values.push(item.goodsCount)
      }
      return { xLabels, values }
    })
    const categoryGoodsFavor = computed(() => {
      const xLabels: string[] = []
      const values: any[] = []
      const categoryGoodsFavor = store.state.dashboard.categoryGoodsFavor
      for (const item of categoryGoodsFavor) {
        xLabels.push(item.name)
        values.push(item.goodsFavor)
      }
      return { xLabels, values }
    })
    const addressGoodsSale = computed(() => {
      return store.state.dashboard.addressGoodsSale.map((item: any) => {
        return { name: item.address, value: item.count }
      })
    })

    return {
      topPanelData,
      categoryGoodsCount,
      categoryGoodsSale,
      categoryGoodsFavor,
      addressGoodsSale
    }
  }
})
</script>

<style lang="less" scoped>
.dashboard {
  background-color: #f5f5f5;

  .content-row {
    margin-top: 20px;
  }
}
</style>

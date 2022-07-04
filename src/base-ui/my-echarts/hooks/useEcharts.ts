import * as echarts from 'echarts'

import chinaMapData from '../data/china.json'

echarts.registerMap('china', chinaMapData)

export default function (el: HTMLElement) {
  // 根据传入的 DOM 节点 创建 Echarts 实例
  const echartInstance = echarts.init(el)

  // 根据选项属性绘制图标
  const setOptions = (options: echarts.EChartsOption) => {
    echartInstance.setOption(options)
  }

  // 重新绘制图标
  const updateSize = () => {
    echartInstance.resize()
  }

  // 当窗口发生改变时重绘图表
  window.addEventListener('resize', () => {
    echartInstance.resize()
  })

  return {
    echartInstance,
    setOptions,
    updateSize
  }
}

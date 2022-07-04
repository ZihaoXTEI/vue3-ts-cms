<template>
  <div class="my-echarts">
    <div ref="echartsDivRef" :style="{ width: width, height: height }"></div>
  </div>
</template>

<script lang="ts" setup>
import {
  ref,
  withDefaults,
  defineProps,
  onMounted,
  watchEffect,
  defineExpose
} from 'vue'

import { EChartsOption } from 'echarts'

import useEcharts from '../hooks/useEcharts'

const props = withDefaults(
  defineProps<{
    options: EChartsOption
    width?: string
    height?: string
  }>(),
  {
    width: '100%',
    height: '360px'
  }
)

const name = 'my-echarts'

const echartsDivRef = ref<HTMLElement>()

// 在 DOM 挂载后才创建 Echarts 实例
onMounted(() => {
  const { setOptions } = useEcharts(echartsDivRef.value!)

  // 配置选项改变时重新绘制图表
  watchEffect(() => {
    setOptions(props.options)
  })
})

defineExpose({
  name
})
</script>

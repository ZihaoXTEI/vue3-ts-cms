<template><span ref="countRef"></span></template>

<script lang="ts">
import { defineComponent, ref, watch, onMounted } from 'vue'

import { CountUp } from 'countup.js'
import type { CountUpOptions } from 'countup.js'

// CountUp 默认配置信息
const defaultOptions: CountUpOptions = {
  decimalPlaces: 2, // 保留两位
  duration: 2, // 动画时长
  separator: ',', // 千位分割
  decimal: '.', // 小数分割
  prefix: '￥' // 单位
}

export default defineComponent({
  name: 'my-countup',
  props: {
    /**
     * 数值
     */
    number: {
      type: Number,
      required: true
    },
    /**
     * 自定义配置
     */
    option: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props) {
    const countRef = ref<HTMLDivElement>()
    const instance = ref<CountUp>()

    watch(
      () => props.number,
      () => {
        update(props.number)
      }
    )

    const createCounter = () => {
      if (!countRef.value) return
      const options: CountUpOptions = Object.assign(
        defaultOptions,
        props.option
      )
      // 创建 CountUp 实例
      instance.value = new CountUp(countRef?.value, props.number, options)
      start()
    }

    // 开始执行动画
    const start = () => {
      if (!instance.value) return
      instance?.value.start()
    }

    // 更新结束值并设置动画
    const update = (number: number) => {
      if (!instance.value) return
      instance?.value.update(number)
    }

    // DOM 挂载后调用创建 CountUp 实例方法
    onMounted(() => {
      createCounter()
    })

    return {
      countRef
    }
  }
})
</script>

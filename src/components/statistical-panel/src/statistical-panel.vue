<template>
  <div class="statistical-panel">
    <div class="header">
      <span>{{ panelData.title }}</span>
      <el-tooltip :content="panelData.tips" placement="top" effect="light">
        <el-icon><Warning /></el-icon>
      </el-tooltip>
    </div>

    <div class="content">
      <my-countup
        :number="panelData.number1"
        :option="
          panelData.amount === 'saleroom' ? counterOption2 : counterOption1
        "
      ></my-countup>
    </div>

    <div class="footer">
      <span>
        {{ panelData.subtitle }}
        <my-countup
          :number="panelData.number2"
          :option="
            panelData.amount === 'saleroom' ? counterOption2 : counterOption1
          "
        ></my-countup>
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'statistical-panel',
  props: {
    panelData: {
      type: Object,
      default: () => ({})
    }
  },
  setup() {
    const counterOption1 = {
      decimalPlaces: 0, // 保留两位
      prefix: '' // 单位
    }
    const counterOption2 = {
      decimalPlaces: 0, // 保留两位
      prefix: '￥' // 单位
    }
    return {
      counterOption1,
      counterOption2
    }
  }
})
</script>

<style lang="less" scoped>
@height: 38px;

.statistical-panel {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  height: 130px;
  margin-bottom: 20px;
  padding: 0 20px;
  background: #fff;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  text-align: left;
  overflow: hidden;

  .header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-end;
    height: @height;
    font-size: 14px;
    color: rgba(0, 0, 0, 0.45);
  }

  .content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    flex: 1;
    margin-left: 0px;
    font-size: 26px;
    color: rgba(0, 0, 0, 0.85);
  }

  .footer {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    height: @height;
    font-size: 14px;
    letter-spacing: 1px;
    color: rgba(0, 0, 0, 0.85);
    border-top: 1px solid #f0f0f0;
  }
}
</style>

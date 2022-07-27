<template>
  <div class="pie-echart">
    <base-echart :options="options" />
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue'
import BaseEchart from '@/base-ui/base-echart'
import { EChartsOption } from 'echarts'
import { computed } from 'vue'

const props = defineProps<{
  xLabel: string[]
  value: any[]
}>()

const options = computed<EChartsOption>(() => {
  return {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985'
        }
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: props.xLabel
    },
    yAxis: {
      type: 'value'
    },
    legend: {},
    series: [
      {
        name: '分别销量',
        data: props.value,
        type: 'line',
        areaStyle: {},
        emphasis: {
          focus: 'series'
        }
      }
    ]
  }
})
</script>

<style scoped lang="less"></style>

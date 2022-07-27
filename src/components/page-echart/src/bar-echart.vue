<template>
  <div class="pie-echart">
    <base-echart :options="options" />
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue'
import BaseEchart from '@/base-ui/base-echart'
import { EChartsOption, graphic } from 'echarts'
import { computed } from 'vue'

const props = defineProps<{
  xLabel: string[]
  value: any[]
}>()

const options = computed<EChartsOption>(() => {
  return {
    xAxis: {
      data: props.xLabel,
      axisLabel: {
        inside: true,
        color: '#fff'
      },
      axisTick: {
        show: false
      },
      axisLine: {
        show: false
      },
      z: 10
    },
    yAxis: {
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        color: '#999'
      }
    },
    dataZoom: [
      {
        type: 'inside'
      }
    ],
    series: [
      {
        type: 'bar',
        showBackground: true,
        itemStyle: {
          color: new graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#83bff6' },
            { offset: 0.5, color: '#188df0' },
            { offset: 1, color: '#188df0' }
          ])
        },
        emphasis: {
          itemStyle: {
            color: new graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: '#2378f7' },
              { offset: 0.7, color: '#2378f7' },
              { offset: 1, color: '#83bff6' }
            ])
          }
        },
        data: props.value
      }
    ]
  }
})
</script>

<style scoped lang="less"></style>

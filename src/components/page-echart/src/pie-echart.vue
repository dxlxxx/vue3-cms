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
import { IDataType } from '../types'

const props = defineProps<{
  data: IDataType[]
}>()

const options = computed<EChartsOption>(() => {
  return {
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'horizontal',
      left: 'left'
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: '50%',
        data: props.data,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  }
})
</script>

<style scoped lang="less"></style>

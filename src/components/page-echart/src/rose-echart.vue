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
    legend: {
      top: 'bottom'
    },
    toolbox: {
      show: true,
      feature: {
        mark: { show: true },
        dataView: { show: true, readOnly: false },
        restore: { show: true },
        saveAsImage: { show: true }
      }
    },
    series: [
      {
        name: '类别数据',
        type: 'pie',
        radius: [10, 100],
        center: ['50%', '50%'],
        roseType: 'area',
        itemStyle: {
          borderRadius: 8
        },
        data: props.data
      }
    ]
  }
})
</script>

<style scoped lang="less"></style>

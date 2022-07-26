<template>
  <div class="base-echart">
    <div class="echartRef" :style="{ width, height }" ref="echartRef"></div>
  </div>
</template>

<script lang="ts" setup>
import type { EChartsOption } from 'echarts'
import { onMounted, ref, withDefaults, defineProps, watchEffect } from 'vue'
import useEchart from '../hooks/useEchart'

const echartRef = ref<HTMLElement | null>(null)

const props = withDefaults(
  defineProps<{
    width?: string
    height?: string
    options: EChartsOption
  }>(),
  {
    width: '100%',
    height: '360px'
  }
)

onMounted(() => {
  const { setOption } = useEchart(echartRef.value!)
  setOption(props.options)
  watchEffect(() => {
    setOption(props.options)
  })
})
</script>

<style scoped lang="less"></style>

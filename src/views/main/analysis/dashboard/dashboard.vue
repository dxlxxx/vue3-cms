<template>
  <div class="dashboard">
    <el-row :gutter="10">
      <el-col :span="7">
        <xl-card title="分类商品数量(饼图)">
          <pie-echart :data="data"></pie-echart>
        </xl-card>
      </el-col>
      <el-col :span="10">
        <xl-card title="不同城市商品销量"></xl-card>
      </el-col>
      <el-col :span="7">
        <xl-card title="分类商品数量(玫瑰图)"></xl-card>
      </el-col>
    </el-row>

    <el-row :gutter="10" class="content-row">
      <el-col :span="12">
        <xl-card title="分类商品数量(饼图)"></xl-card>
      </el-col>
      <el-col :span="12">
        <xl-card title="不同城市商品销量"></xl-card>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
import { useStore } from '@/store'
import XlCard from '@/base-ui/card'
import { PieEchart } from '@/components/page-echart'
import { computed } from 'vue'
import { IDataType } from '@/components/page-echart/types'

const store = useStore()

const data = computed(() => {
  return store.state.dashboardModule.categoryGoodsCount.map<IDataType>(
    (item) => {
      return { name: item.name, value: item.goodsCount }
    }
  )
})

console.log(data.value)

store.dispatch('dashboardModule/getDashboardDataAction')
</script>

<style scoped lang="less">
.content-row {
  margin-top: 20px;
}
</style>

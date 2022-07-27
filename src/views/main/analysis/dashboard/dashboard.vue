<template>
  <div class="dashboard">
    <el-row :gutter="10">
      <el-col :span="7">
        <xl-card title="分类商品数量(饼图)">
          <pie-echart :data="categoryGoodsCount" />
        </xl-card>
      </el-col>
      <el-col :span="10">
        <xl-card title="不同城市商品销量">
          <map-echart :map-data="addressGoodsSale" />
        </xl-card>
      </el-col>
      <el-col :span="7">
        <xl-card title="分类商品数量(玫瑰图)">
          <rose-echart :data="categoryGoodsCount" />
        </xl-card>
      </el-col>
    </el-row>

    <el-row :gutter="10" class="content-row">
      <el-col :span="12">
        <xl-card title="分类商品的销量">
          <line-echart v-bind="categoryGoodsSale" />
        </xl-card>
      </el-col>
      <el-col :span="12">
        <xl-card title="分类商品的收藏">
          <bar-echart v-bind="categoryGoodsFavor" />
        </xl-card>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
import { useStore } from '@/store'
import XlCard from '@/base-ui/card'
import {
  PieEchart,
  RoseEchart,
  LineEchart,
  BarEchart,
  MapEchart
} from '@/components/page-echart'
import { computed } from 'vue'
import { IDataType } from '@/components/page-echart/types'

const store = useStore()

const categoryGoodsCount = computed(() => {
  return store.state.dashboardModule.categoryGoodsCount.map<IDataType>(
    (item) => {
      return { name: item.name, value: item.goodsCount }
    }
  )
})

const categoryGoodsSale = computed(() => {
  const xLabel: string[] = []
  const value: any[] = []
  const categoryGoodsSale = store.state.dashboardModule.categoryGoodsSale
  for (const item of categoryGoodsSale) {
    xLabel.push(item.name)
    value.push(item.goodsCount)
  }
  return {
    xLabel,
    value
  }
})

const categoryGoodsFavor = computed(() => {
  const xLabel: string[] = []
  const value: any[] = []
  const categoryGoodsSale = store.state.dashboardModule.categoryGoodsFavor
  for (const item of categoryGoodsSale) {
    xLabel.push(item.name)
    value.push(item.goodsFavor)
  }
  return {
    xLabel,
    value
  }
})

const addressGoodsSale = computed(() => {
  return store.state.dashboardModule.addressGoodsSale.map((item: any) => {
    return { name: item.address, value: item.count }
  })
})

store.dispatch('dashboardModule/getDashboardDataAction')
</script>

<style scoped lang="less">
.content-row {
  margin-top: 20px;
}
</style>

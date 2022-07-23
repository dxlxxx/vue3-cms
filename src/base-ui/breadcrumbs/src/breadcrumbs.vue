<template>
  <div class="breadcrumbs">
    <el-breadcrumb separator="/">
      <template v-for="item in breadcrumbs" :key="item.name">
        <el-breadcrumb-item :to="{ path: item.path }">{{
          item.name
        }}</el-breadcrumb-item>
      </template>
    </el-breadcrumb>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, PropType } from 'vue'
import { IBreadcrumb } from './types'

defineProps({
  breadcrumbs: {
    type: Array as PropType<IBreadcrumb[] | null>,
    default: () => []
  }
})
</script>

<style scoped lang="less"></style>

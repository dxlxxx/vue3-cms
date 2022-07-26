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
import { defineProps, withDefaults } from 'vue'
import { IBreadcrumb } from './types'

withDefaults(
  defineProps<{
    breadcrumbs: IBreadcrumb[]
  }>(),
  { breadcrumbs: () => [] }
)
</script>

<style scoped lang="less"></style>

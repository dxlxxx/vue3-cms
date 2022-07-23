<template>
  <div class="role">
    <page-search :searchFormConfig="searchFormConfig" />
    <page-content :contentConfig="contentTableConfig" pageName="role" />
  </div>
</template>

<script lang="ts" setup>
import PageSearch from '@/components/page-search'
import { searchFormConfig } from './config/search.config'
import { contentTableConfig } from './config/content.config'
import PageContent from '@/components/page-content'
</script>

<style scoped lang="less">
.role {
  .el-table {
    text-align: center;
  }
}
</style>

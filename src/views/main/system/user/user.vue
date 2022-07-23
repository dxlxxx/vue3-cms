<template>
  <div class="user">
    <page-search
      :searchFormConfig="searchFormConfig"
      @resetEmit="handleReset"
      @searchEmit="handleSearch"
    />
    <page-content
      :contentConfig="contentTableConfig"
      pageName="user"
      ref="pageContentRef"
    />
  </div>
</template>

<script lang="ts" setup>
import PageSearch from '@/components/page-search'
import { searchFormConfig } from './config/search.config'
import { contentTableConfig } from './config/content.config'
import PageContent from '@/components/page-content'
import useSearchPage from '@/hooks/useSearchPage'

const [pageContentRef, handleReset, handleSearch] = useSearchPage()
</script>

<style scoped lang="less">
.user {
  .el-table {
    text-align: center;
  }
}
</style>

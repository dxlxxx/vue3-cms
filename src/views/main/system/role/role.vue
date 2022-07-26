<template>
  <div class="role">
    <page-search
      :searchFormConfig="searchFormConfig"
      @resetEmit="handleReset"
      @searchEmit="handleSearch"
    />
    <page-content
      :contentConfig="contentTableConfig"
      pageName="role"
      ref="pageContentRef"
      @handleNewClickEmit="handleNewClick"
      @handleEditClick="handleEditClick"
    />
    <page-dialog
      :modalConfig="modalConfig"
      ref="dialogRef"
      :_initFormData="_initFormData"
    />
  </div>
</template>

<script lang="ts" setup>
import PageSearch from '@/components/page-search'
import { searchFormConfig } from './config/search.config'
import { contentTableConfig } from './config/content.config'
import PageContent from '@/components/page-content'
import usePageDialog from '@/hooks/usePageDialog'
import useSearchPage from '@/hooks/useSearchPage'
import { modalConfig } from './config/modal.config'

const [pageContentRef, handleReset, handleSearch] = useSearchPage()
const [dialogRef, _initFormData, handleNewClick, handleEditClick] =
  usePageDialog()
</script>

<style scoped lang="less">
.role {
  .el-table {
    text-align: center;
  }
}
</style>

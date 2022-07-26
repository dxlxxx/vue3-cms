<template>
  <div class="user">
    <page-search
      :searchFormConfig="searchFormConfig"
      @resetEmit="handleReset"
      @searchEmit="handleSearch"
    />
    <page-content
      :contentConfig="contentTableConfig"
      pageName="users"
      ref="pageContentRef"
      @handleNewClickEmit="handleNewClick"
      @handleEditClick="handleEditClick"
    />
    <page-dialog
      :modalConfig="modalConfigRef"
      ref="dialogRef"
      :_initFormData="_initFormData"
      pageName="users"
    />
  </div>
</template>

<script lang="ts" setup>
import PageSearch from '@/components/page-search'
import { searchFormConfig } from './config/search.config'
import { contentTableConfig } from './config/content.config'
import { modalConfig } from './config/modal.config'
import PageContent from '@/components/page-content'
import useSearchPage from '@/hooks/useSearchPage'
import PageDialog from '@/components/page-dialog'
import usePageDialog from '@/hooks/usePageDialog'
import store from '@/store'
import { computed } from 'vue'

const cbNewClick = () => {
  const passwordItem = modalConfig.formItems.find(
    (item) => item.field === 'password'
  )
  if (passwordItem) {
    passwordItem.isHidden = false
  }
}

const cbEditClick = () => {
  const passwordItem = modalConfig.formItems.find(
    (item) => item.field === 'password'
  )
  if (passwordItem) {
    passwordItem.isHidden = true
  }
}

// 动态添加部门和角色

const modalConfigRef = computed(() => {
  const roleItem = modalConfig.formItems.find((item) => item.field === 'roleId')
  roleItem!.options = store.state.entireRole.map((item) => ({
    title: item.name,
    value: item.id
  }))

  const departmentItem = modalConfig.formItems.find(
    (item) => item.field === 'departmentId'
  )
  departmentItem!.options = store.state.entireDepartment.map((item) => ({
    title: item.name,
    value: item.id
  }))

  return modalConfig
})

const [pageContentRef, handleReset, handleSearch] = useSearchPage()
const [dialogRef, _initFormData, handleNewClick, handleEditClick] =
  usePageDialog(cbNewClick, cbEditClick)
</script>

<style scoped lang="less">
.user {
  .el-table {
    text-align: center;
  }
}
</style>

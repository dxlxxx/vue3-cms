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
      pageName="role"
      :otherInfo="menuRef"
    >
      <div class="tree">
        <el-tree
          :data="menuList"
          :props="{ children: 'children', label: 'name' }"
          node-key="id"
          show-checkbox
          @check="handleCheck"
          :default-checked-keys="defaultCheckedKeys"
        />
      </div>
    </page-dialog>
  </div>
</template>

<script lang="ts" setup>
import PageSearch from '@/components/page-search'
import { searchFormConfig } from './config/search.config'
import { contentTableConfig } from './config/content.config'
import PageContent from '@/components/page-content'
import PageDialog from '@/components/page-dialog'
import usePageDialog from '@/hooks/usePageDialog'
import useSearchPage from '@/hooks/useSearchPage'
import { modalConfig } from './config/modal.config'
import { computed, ref } from 'vue'
import { useStore } from '@/store'
import { mapMenuToTree } from '@/utils'

const store = useStore()

const menuList = computed(() => {
  return store.state.entireMenu
})

const menuRef = ref({})
const defaultCheckedKeys = ref({})

const handleCheck = (data1: any, data2: any) => {
  const halfCheckedKeys = data2.halfCheckedKeys
  const checkedKeys = data2.checkedKeys
  const menuList = [...halfCheckedKeys, ...checkedKeys]
  menuRef.value = { menuList }
}

const [pageContentRef, handleReset, handleSearch] = useSearchPage()
const [dialogRef, _initFormData, handleNewClick, handleEditClick] =
  usePageDialog(undefined, (row: any) => {
    defaultCheckedKeys.value = mapMenuToTree(row.menuList)
  })
</script>

<style scoped lang="less">
.role {
  .el-table {
    text-align: center;
  }
  .tree {
    margin-left: 25px;
  }
}
</style>

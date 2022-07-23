<template>
  <div class="page-content">
    <xl-tabel v-bind="contentConfig" :listData="dataList">
      <template #headerHandler>
        <el-button v-if="pageName === 'user'" type="primary">
          新建用户
        </el-button>
        <el-button v-else-if="pageName === 'role'" type="primary">
          新建角色
        </el-button>
      </template>
      <template #status="{ row }">
        <el-button
          :type="row.enable ? 'success' : 'danger'"
          size="small"
          plain
          >{{ row.enable ? '启用' : '禁用' }}</el-button
        >
      </template>
      <template #createAt="{ row }">
        {{ $filters.formatTime(row.createAt) }}
      </template>
      <template #updateAt="{ row }">
        {{ $filters.formatTime(row.updateAt) }}
      </template>
      <template #handler>
        <el-link :icon="Edit">编辑</el-link>
        <el-link :icon="Delete">删除</el-link>
      </template>
    </xl-tabel>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, computed, defineExpose } from 'vue'
import XlTabel from '@/base-ui/table'
import { useStore } from '@/store'
import { Delete, Edit } from '@element-plus/icons-vue'

const props = defineProps({
  contentConfig: {
    type: Object,
    requried: true
  },
  pageName: {
    type: String,
    requried: true
  }
})

const store = useStore()

const getPageList = (queryInfo: any = {}) => {
  store.dispatch('systemModule/getPageListAction', {
    pageName: props.pageName,
    queryInfo: {
      offset: 0,
      size: 10,
      ...queryInfo
    }
  })
}

getPageList()

const dataList = computed(
  () => (store.state.systemModule as any)[`${props.pageName}List`]
)
/* const dataCount = computed(
  () => (store.state.systemModule as any)[`${props.pageName}count`]
) */

defineExpose({
  getPageList
})
</script>

<style scoped lang="less">
.page-content {
  padding: 20px;
  border-top: 20px solid #f0f2f5;

  .el-link {
    margin-right: 10px;
  }
}
</style>

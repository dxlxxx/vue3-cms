<template>
  <div class="page-content">
    <xl-tabel
      v-bind="contentConfig"
      :listData="dataList"
      :listCount="dataCount"
      v-model:pageInfo="pageInfo"
    >
      <!-- 固定插槽 -->
      <template #headerHandler>
        <el-button v-if="isCreate" type="primary" @click="handleNewClick">
          {{ contentConfig.addType }}
        </el-button>
      </template>

      <template #enable="{ row }">
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

      <template #handler="{ row }">
        <el-link :icon="Edit" v-if="isUpdate" @click="handleEditClick(row)"
          >编辑</el-link
        >
        <el-link :icon="Delete" v-if="isDelete" @click="hanleDelete(row)"
          >删除</el-link
        >
      </template>

      <!-- 动态插槽 -->

      <template v-for="other in otherSlotList" #[other.slotName]="scope">
        <template v-if="other.slotName">
          <slot :name="other.slotName" :row="scope.row"></slot>
        </template>
      </template>
    </xl-tabel>
  </div>
</template>

<script lang="ts" setup>
import {
  defineProps,
  computed,
  defineExpose,
  ref,
  watch,
  defineEmits
} from 'vue'
import XlTabel from '@/base-ui/table'
import { useStore } from '@/store'
import { Delete, Edit } from '@element-plus/icons-vue'
import usePermission from '@/hooks/usePermission'

const props = defineProps({
  contentConfig: {
    type: Object,
    required: true
  },
  pageName: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['handleNewClickEmit', 'handleEditClick'])

const pageInfo = ref({
  currentPage: 1,
  pageSize: 10
})

// 权限

const isQuery = usePermission(props.pageName, 'query')
const isCreate = usePermission(props.pageName, 'create')
const isUpdate = usePermission(props.pageName, 'update')
const isDelete = usePermission(props.pageName, 'delete')

// 初始化数据

const store = useStore()

const getPageList = (queryInfo: any = {}) => {
  if (!isQuery) return
  store.dispatch('systemModule/getPageListAction', {
    pageName: props.pageName,
    queryInfo: {
      offset: (pageInfo.value.currentPage - 1) * pageInfo.value.pageSize,
      size: pageInfo.value.pageSize,
      ...queryInfo
    }
  })
}

getPageList()

const dataList = computed(
  () => (store.state.systemModule as any)[`${props.pageName}List`]
)
const dataCount = computed(
  () => (store.state.systemModule as any)[`${props.pageName}Count`]
)

// 分页

watch(pageInfo, () => {
  getPageList()
})

// 动态插槽

const otherSlotList = props.contentConfig?.propList.filter((item: any) => {
  if (item.slotName === 'createAt') return false
  if (item.slotName === 'updateAt') return false
  if (item.slotName === 'enable') return false
  if (item.slotName === 'handler') return false
  return true
})

// 删除

const hanleDelete = (row: any) => {
  store.dispatch('systemModule/deletePageDataAction', {
    pageName: props.pageName,
    id: row.id
  })
}

// 新建

const handleNewClick = () => {
  emit('handleNewClickEmit')
}

// 编辑

const handleEditClick = (row: any) => {
  emit('handleEditClick', row)
}

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

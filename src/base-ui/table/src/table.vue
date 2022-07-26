<template>
  <div class="table">
    <div class="header">
      <slot name="header">
        <div class="title">{{ title }}</div>
        <div class="handler">
          <slot name="headerHandler"></slot>
        </div>
      </slot>
    </div>
    <el-table
      :data="listData"
      style="width: 100%"
      border
      @selection-change="handleSelect"
      v-bind="childrenProps"
    >
      <el-table-column
        v-if="showSelectColumn"
        type="selection"
        width="60"
        align="center"
      />
      <el-table-column
        v-if="showIndexColumn"
        type="index"
        label="序号"
        width="60"
        align="center"
      />
      <template v-for="propItem in propList" :key="propItem.prop">
        <el-table-column v-bind="propItem" show-overflow-tooltip align="center">
          <!-- 拿到element plus 暴露的属性 -->
          <template #default="scope">
            <!-- 自己定义一个插槽  默认值-->
            <!-- 动态绑定插槽名 -->
            <slot :name="propItem.slotName" :row="scope.row">
              {{ scope.row[propItem.prop] }}
            </slot>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <div class="footer" v-if="showFooter">
      <slot name="footer">
        <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :page-sizes="[10, 20, 30]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="listCount"
        />
      </slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineEmits, withDefaults, defineProps, computed } from 'vue'

const emit = defineEmits(['changeSelect', 'update:pageInfo'])

const props = withDefaults(
  defineProps<{
    listData: any[]
    listCount: number
    propList: any[]
    showIndexColumn?: boolean
    showSelectColumn?: boolean
    title?: string
    pageInfo?: {
      currentPage: number
      pageSize: number
    }
    childrenProps?: any
    showFooter?: boolean
  }>(),
  {
    showIndexColumn: false,
    showSelectColumn: false,
    showFooter: true,
    pageInfo: () => ({
      currentPage: 1,
      pageSize: 10
    })
  }
)

const handleSelect = (selection: any) => {
  emit('changeSelect', selection)
}

// 分页

const currentPage = computed({
  get() {
    return props.pageInfo.currentPage
  },
  set(newValue) {
    emit('update:pageInfo', { ...props.pageInfo, currentPage: newValue })
  }
})

const pageSize = computed({
  get() {
    return props.pageInfo.pageSize
  },
  set(newValue) {
    emit('update:pageInfo', { ...props.pageInfo, pageSize: newValue })
  }
})
</script>

<style scoped lang="less">
.header {
  display: flex;
  height: 45px;
  padding: 0 5px;
  justify-content: space-between;
  align-items: center;

  .title {
    font-size: 20px;
    font-weight: 700;
  }

  .handler {
    align-items: center;
  }
}

.footer {
  margin-top: 15px;

  .el-pagination {
    justify-content: flex-end;
  }
}
</style>

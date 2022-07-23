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
        <el-table-column v-bind="propItem" align="center">
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
    <div class="footer">
      <slot name="footer">
        <el-pagination
          :page-sizes="[100, 200, 300, 400]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="400"
        />
      </slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineEmits, PropType, defineProps } from 'vue'

const emit = defineEmits(['changeSelect'])

defineProps({
  listData: {
    type: Array,
    requried: true
  },
  propList: {
    type: Array as PropType<any[]>,
    requried: true
  },
  showIndexColumn: {
    type: Boolean,
    defalut: false
  },
  showSelectColumn: {
    type: Boolean,
    defalut: false
  },
  title: {
    type: String,
    defalut: ''
  }
})

const handleSelect = (selection: any) => {
  emit('changeSelect', selection)
}
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

<template>
  <div class="xl-form">
    <div class="title">
      <slot name="title"></slot>
    </div>
    <el-form :label-width="labelWidth" :model="value">
      <el-row>
        <template v-for="item in formItems" :key="item.label">
          <el-col v-bind="colLayout">
            <el-form-item :label="item.label" :style="itemStyle">
              <template
                v-if="item.type === 'input' || item.type === 'password'"
              >
                <el-input
                  :show-password="item.type === 'password'"
                  v-bind="item.otherOptions"
                  v-model="value[item.field]"
                  :placeholder="item.placeholder"
                />
              </template>
              <template v-else-if="item.type === 'select'">
                <el-select
                  v-bind="item.otherOptions"
                  style="width: 100%"
                  v-model="value[item.field]"
                  :placeholder="item.placeholder"
                >
                  <el-option
                    v-for="option in item.options"
                    :key="option.value"
                    :value="option.value"
                    :label="option.title"
                    >{{ option.title }}</el-option
                  >
                </el-select>
              </template>
              <template v-else-if="item.type === 'datepicker'">
                <el-date-picker
                  v-model="value[item.field]"
                  v-bind="item.otherOptions"
                  style="width: 100%"
                />
              </template>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>
    <div class="foot">
      <slot name="foot"></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, defineProps, PropType, defineEmits } from 'vue'
import { IFormItem } from '..'

const props = defineProps({
  formItems: {
    type: Array as PropType<IFormItem[]>,
    default: () => []
  },
  labelWidth: {
    type: String,
    default: '100px'
  },
  itemStyle: {
    type: Object,
    default: () => ({ padding: '10px 40px' })
  },
  colLayout: {
    type: Object,
    default: () => ({
      xl: 6, // >1920px 4个
      lg: 8,
      md: 12,
      sm: 24,
      xs: 24
    })
  },
  modelValue: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['updata:model'])

const value = computed({
  get: () => {
    return props.modelValue
  },
  set: (newValue) => {
    emit('updata:model', newValue)
  }
})
</script>

<style scoped lang="less">
.xl-form {
  overflow: hidden;

  .foot {
    text-align: right;
    margin-bottom: 20px;
    margin-right: 40px;
  }
}
</style>

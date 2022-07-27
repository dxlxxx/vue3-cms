<template>
  <div class="dialog">
    <el-dialog
      v-model="visible"
      :title="modalConfig.title"
      width="30%"
      center
      destroy-on-close
    >
      <xl-form v-model="value" v-bind="modalConfig"></xl-form>
      <slot></slot>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="visible = false">取消</el-button>
          <el-button type="primary" @click="handleComfirm">提交</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, computed, defineEmits } from 'vue'
import XlForm from '@/base-ui/form'

const props = defineProps<{
  modalConfig: any
  modelValue: any
  dialogVisible: boolean
}>()

const emits = defineEmits([
  'update:modelValue',
  'update:dialogVisible',
  'handleComfirm'
])

const value = computed({
  get: () => props.modelValue,
  set: (newValue) => emits('update:modelValue', newValue)
})

const visible = computed({
  get: () => props.dialogVisible,
  set: (newValue) => emits('update:dialogVisible', newValue)
})

const handleComfirm = () => {
  emits('handleComfirm')
  visible.value = false
}
</script>

<style scoped lang="less"></style>

<template>
  <div class="page-search">
    <xl-form v-bind="searchFormConfig" v-model="formData">
      <template #title>
        <h2 class="title">高级检索</h2>
      </template>
      <template #foot>
        <el-button type="primary" :icon="Refresh" @click="handleReset"
          >重置</el-button
        >
        <el-button type="primary" :icon="Search" @click="handleSearch"
          >搜索</el-button
        >
      </template>
    </xl-form>
  </div>
</template>

<script lang="ts" setup>
import { ref, defineEmits, defineProps } from 'vue'
import XlForm from '@/base-ui/form'
import { Search, Refresh } from '@element-plus/icons-vue'

const emit = defineEmits(['resetEmit', 'searchEmit'])
const props = defineProps({
  searchFormConfig: {
    type: Object,
    required: true
  }
})

// 动态生成ref
const formObj: any = {}
for (const formItem of props.searchFormConfig.formItems) {
  formObj[formItem.field] = ''
}
const formData = ref({ ...formObj })

const handleReset = () => {
  formData.value = { ...formObj }
  emit('resetEmit')
}

const handleSearch = () => emit('searchEmit', formData.value)
</script>

<style scoped lang="less"></style>

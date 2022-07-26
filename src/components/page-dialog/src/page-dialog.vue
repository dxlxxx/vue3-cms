<template>
  <div class="page-dialog">
    <xl-dialog
      :modalConfig="modalConfig"
      v-model="formData"
      v-model:dialogVisible="dialogVisible"
      @handleComfirm="handleComfirm"
    ></xl-dialog>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, ref, defineExpose, watch } from 'vue'
import XlDialog from '@/base-ui/dialog'
import store from '@/store'

const props = defineProps({
  modalConfig: {
    type: Object,
    required: true
  },
  _initFormData: {
    type: Object,
    default: () => ({})
  },
  pageName: {
    type: String,
    required: true
  }
})

const _defaultData: any = {}

for (const formItem of props.modalConfig.formItems) {
  _defaultData[`${formItem.field}`] = ''
}

const formData = ref({ ..._defaultData })

const dialogVisible = ref(false)

watch(
  () => props._initFormData,
  (newValue) => {
    for (const formItem of props.modalConfig.formItems) {
      formData.value[`${formItem.field}`] = newValue[`${formItem.field}`] ?? ''
    }
  }
)

const handleComfirm = () => {
  if (Object.keys(props._initFormData).length === 0) {
    store.dispatch('systemModule/createPageDataAction', {
      pageName: props.pageName,
      newData: formData.value
    })
  } else {
    store.dispatch('systemModule/editPageDataAction', {
      pageName: props.pageName,
      id: props._initFormData.id,
      editData: formData.value
    })
  }
}

defineExpose({
  dialogVisible
})
</script>

<style scoped lang="less"></style>

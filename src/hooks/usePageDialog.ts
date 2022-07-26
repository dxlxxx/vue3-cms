import { ref } from 'vue'
import PageDialog from '@/components/page-dialog'

type callbackFn = () => any

export default function usePageDialog(
  cbNewClick?: callbackFn,
  cbEditClick?: callbackFn
): any[] {
  const dialogRef = ref<InstanceType<typeof PageDialog> | null>(null)

  const _initFormData = ref({})

  const handleNewClick = () => {
    if (dialogRef.value) {
      dialogRef.value.dialogVisible = true
      _initFormData.value = {}
    }
    cbNewClick && cbNewClick()
  }

  const handleEditClick = (row: any) => {
    if (dialogRef.value) {
      dialogRef.value.dialogVisible = true
      _initFormData.value = row
    }
    cbEditClick && cbEditClick()
  }

  return [dialogRef, _initFormData, handleNewClick, handleEditClick]
}

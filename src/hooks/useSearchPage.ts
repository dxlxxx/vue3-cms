import { ref } from 'vue'
import PageContent from '@/components/page-content'

export default function useSearchPage() {
  const pageContentRef = ref<InstanceType<typeof PageContent> | null>(null)

  const handleReset = () => {
    pageContentRef.value?.getPageList()
  }

  const handleSearch = (queryInfo: any) => {
    pageContentRef.value?.getPageList(queryInfo)
  }

  return [pageContentRef, handleReset, handleSearch]
}

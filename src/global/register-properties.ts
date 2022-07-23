import { formatTime } from '@/utils'
import { App } from 'vue'

interface IFilters {
  formatTime: (value: string) => string
}

export default function registerProperties(app: App) {
  app.config.globalProperties.$filters = {
    formatTime(value: string) {
      return formatTime(value)
    }
  }
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $filters: IFilters
  }
}

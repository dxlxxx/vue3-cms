import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { xlRequest } from './service'
import store from './store'

interface ResType {
  data: DataType
  returnCode: string
  success: boolean
}
interface DataType {
  banner: Itme
  dKeyword: Itme
  keywords: Itme
  recommend: Itme
}
interface Itme {
  context: { currentTime: number }
  isEnd: boolean
  list: ArrayT[]
  nextPage: number
}
interface ArrayT {
  acm: string
  height: number
  height923: number
  image: string
  image923: string
  link: string
  title: string
  width: number
  width923: number
}

xlRequest
  .request<ResType>({
    url: '/home/multidata',
    method: 'get'
  })
  .then((res) => {
    console.log(res.data)
    console.log(res.data.banner.context.currentTime)
  })
createApp(App).use(store).use(router).mount('#app')

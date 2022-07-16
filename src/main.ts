import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { xlRequest } from './service'
import store from './store'
xlRequest.request({
  url: '/home/multidata',
  method: 'get'
})
createApp(App).use(store).use(router).mount('#app')

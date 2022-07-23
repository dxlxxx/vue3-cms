import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store, { key, _initState } from './store'
import 'element-plus/dist/index.css'
// 初始化的css
import 'normalize.css'
import './assets/styles/index.less'
import { registerIcon, registerProperties } from './global'

_initState()

createApp(App)
  .use(store, key)
  .use(router)
  .use(registerIcon)
  .use(registerProperties)
  .mount('#app')

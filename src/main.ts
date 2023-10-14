import { createApp } from 'vue'
import App from '@/App.vue'
// 不引入这个，svg图标不显示
import 'virtual:svg-icons-register'
import globalComponent from '@/components'
import '@/style/index.scss'
const app = createApp(App)
app.use(globalComponent)
console.log(app, 'app')

import router from './router'
app.use(router)

import ElementPlus from 'element-plus'
app.use(ElementPlus)
app.mount('#app')

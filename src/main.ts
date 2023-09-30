import { createApp } from 'vue'
import App from '@/App.vue'
// 不引入这个，svg图标不显示
import 'virtual:svg-icons-register'
import globalComponent from '@/components'

const app = createApp(App)
app.use(globalComponent)
console.log(app, 'app')
app.mount('#app')

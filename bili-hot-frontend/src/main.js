import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router/index.js'
import { ElTable, ElLoading, ElButton } from 'element-plus'

const app = createApp(App)
app.use(router)
app.use(ElTable)
app.use(ElButton)
app.use(ElLoading)

app.mount('#app')

import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

// 引入vuex并挂载
import store from './store/index'

createApp(App).use(store).mount('#app')
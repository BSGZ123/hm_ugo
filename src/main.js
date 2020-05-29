import Vue from 'vue'
import App from './App.vue'
import router from './router'
import '@/plugins/vant.js'
import '@/assets/css/global.css'
import axios from 'axios'
import store from './store'
import UgoNavbar from '@/components/ugoNavbar/ugonavbar.vue'
Vue.config.productionTip = false

axios.defaults.baseURL = "https://fanhc.xyz/api/public/v1"

// axios.interceptors.response.use(res => {
//      return res.data
// })

Vue.prototype.$http = axios

Vue.component('ugonavbar', UgoNavbar)

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
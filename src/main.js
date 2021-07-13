import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant';
import 'vant/lib/index.css';
import api from './http/api'
import navs from './components/navs/Navs.vue'
import tabbar from './components/tabbar/Tabbar.vue'
import utils from './utils/index'

// 挂载成全局变量
Vue.prototype.$utils = utils
Vue.component('navs', navs)
Vue.component('tabbar', tabbar)

Vue.prototype.$api = api

Vue.use(Vant);

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
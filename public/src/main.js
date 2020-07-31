import Vue from 'vue'
import App from './App.vue'
import './lib/axios'
import router from './router'
import store from './store'
import VueRouter from 'vue-router'
import 'bootstrap/dist/css/bootstrap.css'
import './assets/css/style.css'
import 'popper.js'
import 'jquery'
import './filters'
import 'bootstrap/dist/js/bootstrap.js'

Vue.use(VueRouter)
Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')

import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import router from './router/index'
import store from './store/index'

Vue.use(VueRouter)

import '@/assets/styles/main.scss';

new Vue({
  render: h => h(App),
  el: '#app',
  router,
  store
})

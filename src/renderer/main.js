import 'material-design-icons/iconfont/material-icons.css'
import 'vuetify/dist/vuetify.css'

import Vue from 'vue'
import axios from 'axios'
import Vuetify from 'vuetify'
import FileSystem from './plugins/FileSystem'

import App from './App'
import router from './router'
import store from './store'

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

Vue.use(Vuetify)
Vue.use(FileSystem)

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')

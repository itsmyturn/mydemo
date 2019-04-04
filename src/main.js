import Vue from 'vue'
import Vuex from 'vuex'
import router from './router/router.js'

import App from './App.vue'
import './plugins/element.js'

Vue.use(Vuex)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')

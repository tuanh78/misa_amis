import Vue from 'vue'
import App from './app.vue'
import router from './router'
import store from './store'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserSecret, faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// vue pagination
import Paginate from 'vuejs-paginate'
// font awesome
library.add(faUserSecret, faSpinner)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false
// vue pagination
Vue.component('paginate', Paginate)

// vue input mask
const VueInputMask = require('vue-inputmask').default

Vue.use(VueInputMask)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

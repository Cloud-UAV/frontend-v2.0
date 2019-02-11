import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store'
import moment from 'moment'

Vue.config.productionTip = false


// vuetify
// override default color scheme and add iconfont mdi
import Vuetify from 'vuetify'
import './stylus/main.styl'
import '@mdi/font/css/materialdesignicons.css'
Vue.use(Vuetify, {
  iconfont: 'mdi',
  theme: {
    primary: '#00243D',   // dark blue
    secondary: '#0094C4', // light blue
    accent: '#E8E8E8',    // light grey
    error: '#ED4337',    // red
    info: '#588260',      // accent green
    success: '#007E33',   // green
    warning: '#FF8800'    // amber
  }
})

import VCalendar from 'v-calendar';
import 'v-calendar/lib/v-calendar.min.css';
Vue.use(VCalendar, {
  componentPrefix: 'vc'  // to distinguish from same vuetify prefix v
})

// buefy
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
Vue.use(Buefy)

// lodash
import VueLodash from 'vue-lodash'
Vue.use(VueLodash)

// suppress warnings
Vue.config.silent = true

// event bus
export const EventBus = new Vue();

// moment
Vue.prototype.moment = moment

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

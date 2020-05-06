// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
/* eslint-disable */
import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'
import PageNotFound from '@/components/PageNotFound'
import VueScrollactive from 'vue-scrollactive'
import FixedHeader from 'vue-fixed-header'
import 'buefy/dist/buefy.css'

import { ContentLoader } from 'vue-content-loader'
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'
import * as VueGoogleMaps from "vue2-google-maps";
Vue.use(VueGoogleMaps, {
  load: {
    // key: "YOUR_API_KEY",
    libraries: "places" // necessary for places input
  }
});

Vue.config.productionTip = false
Vue.prototype.liff = window.liff

Vue.component('page-not-found', PageNotFound)
Vue.component('content-loader', ContentLoader)
Vue.component('fixed-header', FixedHeader)
Vue.use(VueResource)
Vue.use(VueScrollactive)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

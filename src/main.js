/**
 * NOTE - This file only exists for development purpose.
 * It will help me to run and test the form
 */


import Vue from 'vue'
import App from './App.vue'
import {VueFormBuilderPlugin} from "@/index";
// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false

Vue.use(VueFormBuilderPlugin)
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'



// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

new Vue({
  render: h => h(App)
}).$mount('#app')

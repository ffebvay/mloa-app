import Vue from 'vue'
import VeeValidate from 'vee-validate'

import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default-dark.css' // Pre-built theme for Material Design

import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'

Vue.config.productionTip = false

Vue.use(VeeValidate)
Vue.use(VueMaterial)

console.log(process.env.VUE_APP_ROOT_API)

// setup fake backend
//import { configureFakeBackend } from './_helpers'
//configureFakeBackend()

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')

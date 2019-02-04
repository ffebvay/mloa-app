import Vue from 'vue'
import VueRouter from 'vue-router'
import VeeValidate from 'vee-validate'
import VueTour from 'vue-tour'

const moment = require('moment')
require('moment/locale/fr')
import VueMoment from 'vue-moment'

import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default-dark.css' // Pre-built theme for Material Design

import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'

Vue.config.productionTip = false

// used to setup useful wrappers
// (router, validation, themes, timezone...)
Vue.use(VueRouter)
Vue.use(VeeValidate)
Vue.use(VueMaterial)
Vue.use(VueMoment, {
    moment
})

// used to provide a tutorial to users
require('vue-tour/dist/vue-tour.css')
Vue.use(VueTour)

// used to prevent the 'cannot read property 'options' of undefined'
// thorwn when trying to add the property 'to' to the
// VueMaterial Bottom Bar
Vue.component('router-link', Vue.options.components.RouterLink)
Vue.component('router-view', Vue.options.components.RouterView)

console.log(process.env.VUE_APP_ROOT_API)

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')

import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'

import { alert } from './_modules/alert.module'
import { snackbar } from './_modules/snackbar.module'
import { account } from './_modules/account.module'
import { users } from './_modules/users.module'
import { tasks } from './_modules/tasks.module'
import { activities } from './_modules/activities.module'

Vue.use(Vuex)

const vuexLocal = new VuexPersistence({
    storage: window.localStorage
})

export default new Vuex.Store({
    state: {

    },
    mutations: {

    },
    actions: {

    },
    modules: {
        alert,
        snackbar,
        account,
        users,
        tasks,
        activities
    },
    plugins: [vuexLocal.plugin]
})

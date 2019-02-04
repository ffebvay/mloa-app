import Vue from 'vue'
import Vuex from 'vuex'

import { alert } from './_modules/alert.module'
import { snackbar } from './_modules/snackbar.module'
import { account } from './_modules/account.module'
import { users } from './_modules/users.module'
import { tasks } from './_modules/tasks.module'

Vue.use(Vuex)

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
        tasks
    }
})

import { userService } from '../_services'
import router from '../router'

const user = JSON.parse(localStorage.getItem('user'))
//let local = user
let state = user
    ? { status: { loggedIn: true }, user }
    : { status: {}, user: null }

const actions = {
    login({ dispatch, commit }, { email, password }) {
        commit('loginRequest', { email })

        userService.login(email, password)
            .then(
                user => {
                    commit('loginSuccess', user)
                    router.push('/')
                },
                error => {
                    commit('loginFailure', error)
                    dispatch('alert/error', 'Une erreur est survenue durant la tentative de connexion : ' + error, { root: true })
                }
            )
    },
    logout({ commit }) {
        userService.logout()
        commit('logout')
    },
    register({ dispatch, commit }, user) {
        commit('registerRequest', user)

        userService.register(user)
            .then(
                user => {
                    commit('registerSuccess', user)
                    router.push('/login')
                    setTimeout(() => {
                        // display success message after route change completes
                        dispatch('alert/success', 'Inscription réussie', { root: true })
                    })
                },
                error => {
                    commit('registerFailure', error)
                    dispatch('alert/error', 'Une erreur est survenue lors de l\'inscription : ' + error, { root: true })
                }
            )
    },
    getCurrent({ commit }, id) {
        commit('getCurrentRequest', id)

        userService.getById(id)
            .then(
                user => commit('getCurrentSuccess', user),
                error => commit('getCurrentFailure', error)
            )
    },
    updateUser({ dispatch, commit }, userParam) {
        commit('updateUserRequest', userParam)

        userService.update(userParam)
            .then(
                user => {
                    commit('updateUserSuccess', user)
                    router.push('/')

                    // Update local user
                    //localStorage.setItem('user', JSON.stringify(userParam))
                },
                error => {
                    commit('updateUserFailure', error)
                    dispatch('alert/error', 'Une erreur est survenue lors de la modification de l\'utilisateur : ' + error, { root: true })
                }
            )
    }
}

const mutations = {
    loginRequest(state, user) {
        state.status = { loggingIn: true }
        state.user = user
        //state.local = user
    },
    loginSuccess(state, user) {
        state.status = { loggedIn: true }
        state.user = user
        //state.local = user
    },
    loginFailure(state) {
        state.status = {}
        state.user = null
        //state.local = null
    },
    logout(state) {
        state.status = {}
        state.user = null
        //state.local = null
    },
    registerRequest(state, user) {
        state.status = { registering: true }
    },
    registerSuccess(state, user) {
        state.status = {}
    },
    registerFailure(state, error) {
        state.status = {}
    },
    updateUserRequest(state, user) {
        state.status = { updating: true }
        state.user = user
    },
    updateUserSuccess(state, user) {
        state.status = {}
        //state.local = user
    },
    updateUserFailure(state, error) {
        state.status = { error }
        state.user = null
    },
    getCurrentRequest(state, user) {
        state.status = { fetching: true }
        //state.user = user
    },
    getCurrentSuccess(state, user) {
        state.status = {}
        state.user = user
    },
    getCurrentFailure(state, error) {
        state.status = { error }
        state.user = null
    }
}

export const account = {
    namespaced: true,
    state,
    actions,
    mutations
}
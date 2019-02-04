import { userService } from '../_services'
import router from '../router'

const user = JSON.parse(localStorage.getItem('user'))
const state = user
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
                },
                error => {
                    commit('updateUserFailure', error)
                    dispatch('alert/error', 'Une erreur est survenue lors de la modification de l\'utilisateur : ' + error, { root: true })
                }
            )
    },
    welcomeUser({ commit }, user) {
        commit('welcomeUserRequest', user)

        let welcomedUser = user

        if (welcomedUser.flags.welcomed === false) {
            welcomedUser.flags.welcomed = true
        }

        welcomedUser.updatedAt = Date.now()

        // Update User stats with local modifications to server
        // then User should be updated in localStorage when updated to DB
        userService.update(welcomedUser)
            .then(
                user => {
                    commit('welcomeUserSuccess', user)

                    // Update local user too
                    localStorage.setItem('user', JSON.stringify(welcomedUser))

                    router.push('/')
                },
                error => {
                    commit('welcomeUserFailure', error)
                    console.log('Une erreur est survenue durant la tentative de modification des caractéristiques : ' + error)
                }
            )
    }
}

const mutations = {
    loginRequest(state, user) {
        state.status = { loggingIn: true }
        state.user = user
    },
    loginSuccess(state, user) {
        state.status = { loggedIn: true }
        state.user = user
    },
    loginFailure(state) {
        state.status = {}
        state.user = null
    },
    logout(state) {
        state.status = {}
        state.user = null
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
        state.status = { updated: true }
        state.user = user
    },
    updateUserFailure(state, error) {
        state.status = { error }
        state.user = null
    },
    getCurrentRequest(state, user) {
        state.status = { fetching: true }
        state.user = user
    },
    getCurrentSuccess(state, user) {
        state.status = {}
        state.user = user
    },
    getCurrentFailure(state, error) {
        state.status = { error }
        state.user = null
    },
    welcomeUserRequest(state, user) {
        state.status = { fetching: true }
        state.user = user
    },
    welcomeUserSuccess(state, user) {
        state.status = {}
        state.user = user
    },
    welcomeUserFailure(state, error) {
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
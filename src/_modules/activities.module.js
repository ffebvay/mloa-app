import { activityService } from '../_services'
import router from '../router'

const state = {
    all: {},
    status: {}
}

const actions = {
    getAll({ commit }) {
        commit('getAllRequest')

        activityService.getAll()
            .then(
                activities => commit('getAllSuccess', activities),
                error => commit('getAllFailure', error)
            )
    },
    getAllByUser({ commit }, uId) {
        commit('getAllByUserRequest', uId)

        activityService.getAllByUser(uId)
            .then(
                activities => commit('getAllByUserSuccess', activities),
                error => commit('getAllByUserFailure', { uId, error: error.toString() })
            )
    },
    getActivity({ commit }, aId) {
        commit('getActivityRequest', aId)

        activityService.getById(aId)
            .then(
                activity => commit('getActivitySuccess', activity),
                error => commit('getActivityFailure', { aId, error: error.toString() })
            )
    },
    addActivity({ dispatch, commit }, activity) {
        commit('addActivityRequest', activity)

        activityService.add(activity)
            .then(
                activity => {
                    commit('addActivitySuccess', activity)
                    router.push('/')
                    setTimeout(() => {
                        // display success message after route change completes
                        // dispatch('alert/success', 'Tâche ajoutée', { root: true })
                    })
                },
                error => {
                    commit('addActivityFailure', error)
                    dispatch('alert/error', 'Une erreur est survenue lors de l\'ajout d\'activité : ' + error, { root: true })
                }
            )
    },
    completeActivity({ commit, dispatch }, params) {
        commit('completeActivityRequest', params.activity)

        const aId = params.activity._id

        // Update selected Task "completed" status
        activityService.update(params.activity)
            .then(
                activity => {
                    commit('completeActivitySuccess', activity)

                    console.log('New stats : ', params.newStats)

                    setTimeout(() => {
                        dispatch('account/updateUser', params.newStats, { root: true })
                        dispatch('snackbar/setSnack', params.snack, { root: true })
                    })
                },
                error => commit('completeActivityFailure', { aId, error: error.toString() })
            )


    },
    editActivity({ dispatch, commit }, activity) {
        commit('editActivityRequest', activity)

        activityService.update(activity)
            .then(
                activity => {
                    commit('editActivitySuccess', activity)
                    router.push('/')
                    setTimeout(() => {
                        // display success message after route change completes
                        // dispatch('alert/success', 'Tâche modifiée', { root: true })
                    })
                },
                error => {
                    commit('editActivityFailure', error)
                    dispatch('alert/error', 'Une erreur est survenue lors de l\'ajout d\'activité : ' + error, { root: true })
                }
            )
    },
    deleteActivity({ commit }, aId) {
        commit('deleteRequest', aId)

        activityService.delete(aId)
            .then(
                activity => commit('deleteSuccess', aId),
                error => commit('deleteFailure', { aId, error: error.toString() })
            )
    }
}

const mutations = {
    getAllRequest(state) {
        state.all = { loading: true }
    },
    getAllSuccess(state, activities) {
        state.all = { items: activities }
    },
    getAllFailure(state, error) {
        state.all = { error }
    },
    getActivityRequest(state) {
        state.current = { fetching: true }
    },
    getActivitySuccess(state, task) {
        state.current = task
    },
    getActivityFailure(state, error) {
        state.current = { error }
    },
    getAllByUserRequest(state) {
        state.all = { loading: true }
    },
    getAllByUserSuccess(state, activities) {
        state.all = { items: activities }
    },
    getAllByUserFailure(state, error) {
        state.all = { error }
    },
    addActivityRequest(state) {
        state.status = { creating: true }
    },
    addActivitySuccess(state) {
        state.status = {}
    },
    addActivityFailure(state, error) {
        state.status = { error }
    },
    completeActivityRequest(state) {
        state.status = { completing: true }
    },
    completeActivitySuccess(state) {
        state.status = {}
    },
    completeActivityFailure(state, error) {
        state.status = { error }
    },
    editActivityRequest(state) {
        state.status = { editing: true }
    },
    editActivitySuccess(state) {
        state.status = {}
    },
    editActivityFailure(state, error) {
        state.status = { error }
    },
    deleteRequest(state) {
        state.status = { deleting: true }
    },
    deleteSuccess(state) {
        state.status = {}
    },
    deleteFailure(state, error) {
        state.status = { error }
    }
}

export const activities = {
    namespaced: true,
    state,
    actions,
    mutations
}
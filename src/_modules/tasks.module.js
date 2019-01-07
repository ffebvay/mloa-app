import {taskService} from '../_services'
import router from '../router'

const state = {
    all: {},
    status: {},
    current: {}
}

const actions = {
    getAll({ commit }) {
        commit('getAllRequest')

        taskService.getAll()
            .then(
                tasks => commit('getAllSuccess', tasks),
                error => commit('getAllFailure', error)
            )
    },
    getAllByUser({ commit }, uId) {
        commit('getAllByUserRequest', uId)

        taskService.getAllByUser(uId)
            .then(
                tasks => commit('getAllByUserSuccess', tasks),
                error => commit('getAllByUserFailure', { uId, error: error.toString() })
            )
    },
    addTask({ dispatch, commit }, task) {
        commit('addTaskRequest', task)

        taskService.add(task)
            .then(
                task => {
                    commit('addTaskSuccess', task)
                    router.push('/')
                    setTimeout(() => {
                        // display success message after route change completes
                        // dispatch('alert/success', 'Tâche ajoutée', { root: true })
                    })
                },
                error => {
                    commit('addTaskFailure', error)
                    dispatch('alert/error', 'Une erreur est survenue lors de l\'ajout de tâche : ' + error, { root: true })
                }
            )
    },
    completeTask({ commit }, task) {
        commit('completeTaskRequest', task)

        const tId = task._id

        taskService.update(task)
            .then(
                task => commit('completeTaskSuccess', task),
                error => commit('completeTaskFailure', { tId, error: error.toString() })
            )
    },
    editTask({ dispatch, commit }, task) {
        commit('editTaskRequest', task)

        taskService.update(task)
            .then(
                task => {
                    commit('editTaskSuccess', task)
                    router.push('/')
                    setTimeout(() => {
                        // display success message after route change completes
                        // dispatch('alert/success', 'Tâche ajoutée', { root: true })
                    })
                },
                error => {
                    commit('editTaskFailure', error)
                    dispatch('alert/error', 'Une erreur est survenue lors de l\'ajout de tâche : ' + error, { root: true })
                }
            )
    },
    deleteTask({ commit }, tId) {
        commit('deleteRequest', tId)

        taskService.delete(tId)
            .then(
                task => commit('deleteSuccess', tId),
                error => commit('deleteFailure', { tId, error: error.toString() })
            )
    }
}

const mutations = {
    getAllRequest(state) {
        state.all = { loading: true }
    },
    getAllSuccess(state, tasks) {
        state.all = { items: tasks }
    },
    getAllFailure(state, error) {
        state.all = { error }
    },
    getAllByUserRequest(state) {
        state.all = { loading: true }
    },
    getAllByUserSuccess(state, tasks) {
        state.all = { items: tasks }
    },
    getAllByUserFailure(state, error) {
        state.all = { error }
    },
    addTaskRequest(state, task) {
        state.status = { creating: true }
    },
    addTaskSuccess(state, task) {
        state.status = {}
    },
    addTaskFailure(state, error) {
        state.status = { error }
    },
    completeTaskRequest(state, task) {
        state.status = { completing: true }
    },
    completeTaskSuccess(state, task) {
        state.status = {}
    },
    completeTaskFailure(state, error) {
        state.status = { error }
    },
    editTaskRequest(state, task) {
        state.status = { editing: true }
    },
    editTaskSuccess(state, task) {
        state.status = {}
    },
    editTaskFailure(state, error) {
        state.status = { error }
    },
    deleteRequest(state, task) {
        state.status = { deleting: true }
    },
    deleteSuccess(state, task) {
        state.status = {}
    },
    deleteFailure(state, error) {
        state.status = { error }
    }
}

export const tasks = {
    namespaced: true,
    state,
    actions,
    mutations
}

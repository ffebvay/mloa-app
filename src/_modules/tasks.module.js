import {taskService} from '../_services'
import {userService} from '../_services'
import { experienceToNextLevel } from "../_helpers/gameHelpers"
import router from '../router'
const moment = require('moment')

const currentUser = JSON.parse(localStorage.getItem('user'))

const state = {
    all: {},
    status: {}
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
    getTask({ commit }, tId) {
        commit('getTaskRequest', tId)

        taskService.getById(tId)
            .then(
                task => commit('getTaskSuccess', task),
                error => commit('getTaskFailure', { tId, error: error.toString() })
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

        // get local user logged in with its inner stats
        let newStats = currentUser
        const tId = task._id

        // Checklist bonuses
        let checklistXP = 0

        // Update selected Task "completed" status
        taskService.update(task)
            .then(
                task => commit('completeTaskSuccess', task),
                error => commit('completeTaskFailure', { tId, error: error.toString() })
            )

        commit('updateUserRequest', newStats)

        // Add or remove XP if Task was checked/ unchecked
        if (task.completed === true) {
            // if task contains a checklist
            if (task.checklist && task.checklist.length > 0) {
                task.checklist.forEach(function(item) {
                    // foreach subtask, if the item was checked => give 2 XP bonus
                    if (item.completed === true) {
                        checklistXP += 2
                    }
                })
            }

            // calculate new earned experience
            newStats.currentExp += ((task.grantExp * task.difficulty) + checklistXP)

            // increment completed tasks
            newStats.completedTasks++

            // set date of completion
            task.completedDate = Date.now()
        }
        else {
            // if task contains a checklist
            if (task.checklist && task.checklist.length > 0) {
                task.checklist.forEach(function(item) {
                    // foreach subtask, if the item was checked => remove the 2 XP bonus
                    if (item.completed === true) {
                        checklistXP += 2
                    }
                })
            }

            // check if total of XP is negative
            newStats.currentExp - ((task.grantExp * task.difficulty) + checklistXP) < 0 ?
                newStats.currentExp = 0
                : newStats.currentExp -= ((task.grantExp * task.difficulty) + checklistXP)

            // update completed tasks counter always greater than 0 !
            newStats.completedTasks - 1 < 0 ? newStats.completedTasks = 0 : newStats.completedTasks--

            // if completedDate is set, delete it
            if (task.completedDate) {
                delete task.completedDate
            }
        }

        // +25% XP Bonus if task is done before/ at due date
        if (task.dueDate && moment().isSameOrBefore(moment(task.dueDate))) {
            console.log(`+25% XP Bonus : ${newStats.currentExp * 0.25} XP`)

            newStats.currentExp += (newStats.currentExp * 0.25)
        }

        console.log(`Player's job new experience : ${newStats.currentExp} XP`)

        // Level up if totalXP of user is superior to the amount of XP to level up
        if (newStats.currentExp >= experienceToNextLevel(newStats.jobLevel)) {
            newStats.jobLevel++
        }

        // Update User stats with local modifications to server
        // then User should be updated in localStorage when updated to DB
        userService.update(newStats)
            .then(
                user => {
                    commit('updateUserSuccess', user)

                    // Update local user too
                    localStorage.setItem('user', JSON.stringify(newStats))

                    router.push('/')
                },
                error => {
                    commit('updateUserFailure', error)
                    console.log('Une erreur est survenue durant la tentative de modification des caractéristiques : ' + error)
                }
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
                        // dispatch('alert/success', 'Tâche modifiée', { root: true })
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
    getTaskRequest(state) {
        state.current = { fetching: true }
    },
    getTaskSuccess(state, task) {
        state.current = task
    },
    getTaskFailure(state, error) {
        state.current = { error }
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
    }
}

export const tasks = {
    namespaced: true,
    state,
    actions,
    mutations
}

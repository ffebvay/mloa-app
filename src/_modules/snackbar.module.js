const state = {
    message: ''
};

const actions = {
    setSnack({ commit }, message) {
        commit('setSnackSuccess', message)
    }
}

const mutations = {
    setSnackSuccess(state, message) {
        state.message = message
    }
}

export const snackbar = {
    namespaced: true,
    state,
    actions,
    mutations
}
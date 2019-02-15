import { authHeader } from '../_helpers'

export const activityService = {
    add,
    getAll,
    getAllByUser,
    getById,
    update,
    delete: _delete
}

function add(activity) {
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(activity)
    }

    return fetch(`${process.env.VUE_APP_ROOT_API}/activities/add`, requestOptions).then(handleResponse)
}

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    }

    return fetch(`${process.env.VUE_APP_ROOT_API}/activities`, requestOptions).then(handleResponse)
}

function getAllByUser(uId) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    }

    return fetch(`${process.env.VUE_APP_ROOT_API}/activities/user/${uId}`, requestOptions).then(handleResponse)
}

function getById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    }

    return fetch(`${process.env.VUE_APP_ROOT_API}/activities/${id}`, requestOptions).then(handleResponse)
}

function update(activity) {
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(activity)
    }

    return fetch(`${process.env.VUE_APP_ROOT_API}/activities/update/${activity._id}`, requestOptions).then(handleResponse)
}

function _delete(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    }

    return fetch(`${process.env.VUE_APP_ROOT_API}/activities/delete/${id}`, requestOptions).then(handleResponse)
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text)
        if (!response.ok) {
            if (response.status === 401) {
                // return to previous page if 401 response returned from API
                location.reload(true)
            }

            const error = (data && data.message) || response.statusText
            return Promise.reject(error)
        }

        return data
    })
}
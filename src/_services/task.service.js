import { authHeader } from '../_helpers'

export const taskService = {
    add,
    getAll,
    getById,
    update,
    delete: _delete
}

function add(task) {
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(task)
    }

    return fetch(`${process.env.VUE_APP_ROOT_API}/tasks/add`, requestOptions).then(handleResponse)
}

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    }

    return fetch(`${process.env.VUE_APP_ROOT_API}/tasks`, requestOptions).then(handleResponse)
}


function getById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    }

    return fetch(`${process.env.VUE_APP_ROOT_API}/tasks/${id}`, requestOptions).then(handleResponse)
}

function update(task) {
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(task)
    }

    return fetch(`${process.env.VUE_APP_ROOT_API}/tasks/update/${task.id}`, requestOptions).then(handleResponse)
}

function _delete(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    }

    return fetch(`${process.env.VUE_APP_ROOT_API}/tasks/delete/${id}`, requestOptions).then(handleResponse)
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
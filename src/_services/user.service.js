import { authHeader } from '../_helpers'

export const userService = {
    login,
    logout,
    register,
    getAll,
    getById,
    update
}

function login(email, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    }

    return fetch(`${process.env.VUE_APP_ROOT_API}/users/authenticate`, requestOptions)
        .then(handleResponse)
        .then(user => {

            // login successful if there's a jwt token in the response
            if (user.token) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(user))
            }

            return user
        })
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user')
}

function register(user) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    }

    return fetch(`${process.env.VUE_APP_ROOT_API}/users/register`, requestOptions).then(handleResponse)
}

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    }

    return fetch(`${process.env.VUE_APP_ROOT_API}/users`, requestOptions).then(handleResponse)
}


function getById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    }

    return fetch(`${process.env.VUE_APP_ROOT_API}/users/${id}`, requestOptions).then(handleResponse)
}

function update(user) {
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    }

    return fetch(`${process.env.VUE_APP_ROOT_API}/users/${user._id}`, requestOptions)
        .then(handleResponse)
        .then(user => {
            return user
        })
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text)
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout()
                location.reload(true)
            }

            const error = (data && data.message) || response.statusText
            return Promise.reject(error)
        }

        return data
    })
}
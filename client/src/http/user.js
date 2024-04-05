import {jwtDecode} from 'jwt-decode'

const {
    $host,
    $authHost
} = require('./index')

export const registration = async (userNickname, userEmail, userPassword) => {
    const {data} = await $host.post('/user/registration', {
        userNickname,
        userEmail,
        userPassword
    })
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token)
}
export const login = async (userEmail, userPassword) => {
    const {data} = await $host.post('/user/login', {
        userEmail,
        userPassword
    })
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token)
}

export const check = async () => {
    const {data} = await $authHost.get('/user/auth')
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token)
}

export const logout = async () => {
    const {data} = await $authHost.get('/user/logout')
    localStorage.removeItem('token')
    return data
}
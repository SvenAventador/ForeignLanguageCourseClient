const {
    $host,
    $authHost
} = require('./index')

export const getOne = async (id) => {
    const {data} = await $host.get(`api/language/one?id=${id}`)
    return data
}

export const getAll = async () => {
    const {data} = await $host.get('api/language/')
    return data
}

export const create = async (languageName) => {
    const {data} = await $authHost.post('api/language', {languageName})
    return data
}

export const update = async (id, languageName) => {
    const {data} = await $authHost.put(`api/language?id=${id}`, {languageName})
    return data
}
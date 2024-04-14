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
    const {data} = $authHost.post('api/language', {languageName})
    return data
}

export const update = async (id, languageName) => {
    const {data} = $authHost.put(`api/language?id=${id}`, {languageName})
    return data
}

export const deleteOne = async (id) => {
    const {data} = $authHost.delete(`api/language/one?id=${id}`)
    return data
}

export const deleteAll = async () => {
    const {data} = $authHost.delete('api/language/')
    return data
}
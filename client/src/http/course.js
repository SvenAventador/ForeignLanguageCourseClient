const {
    $host,
    $authHost
} = require('./index')

export const getAdminAll = async () => {
    const {data} = await $host.get('api/course/admin')
    return data
}

export const getOne = async (id) => {
    const {data} = await $host.get(`api/course/${id}`)
    return data
}

export const getAll = async (languageId) => {
    const {data} = await $host.get('api/course/', {
        params: {
            languageId
        }
    })
    return data
}

export const create = async (course) => {
    const {data} = await $authHost.post('api/course', course)
    return data
}

export const update = async (id, course) => {
    const {data} = await $authHost.put(`api/course?id=${id}`, course)
    return data
}

export const deleteOne = async (id) => {
    return await $authHost.delete(`api/course/${id}`)
}

export const deleteAll = async () => {
    return await $authHost.delete('api/course')
}

export const enrollACourse = async (userId, courseId) => {
    const {data} = await $host.post('api/course/enroll', {userId, courseId})
    return data
}
const {
    $host,
    $authHost
} = require('./index')

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
    const {data} = $authHost.post('api/course', course)
    return data
}

export const update = async (id, course) => {
    const {data} = $authHost.put(`api/course?id=${id}`, course)
    return data
}

export const deleteOne = async (id) => {
    const {data} = $authHost.delete(`api/course/${id}`)
    return data
}

export const deleteAll = async () => {
    const {data} = $authHost.delete('api/course')
    return data
}

export const enrollACourse = async (userId, courseId) => {
    const {data} = $host.post('api/course/enroll', {userId, courseId})
    return data
}
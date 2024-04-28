import {$authHost, $host} from "./index";

export const getOne = async (id) => {
    const {data} = await $host.get(`api/chapter?id=${id}`)
    return data
}

export const create = async (chapter) => {
    const {data} = await $authHost.post(`api/chapter`, chapter)
    return data
}

export const deleteOne = async (id) => {
    return await $authHost.delete(`api/chapter/one?id=${id}`)
}

export const deleteAll = async (courseId) => {
    return await $authHost.delete(`api/chapter?courseId=${courseId}`)
}

export const getAllTest = async () => {
    const {data} = await $authHost.get('api/chapter/all')
    return data
}
import {$authHost} from "./index";

export const getAllUser = async () => {
    const {data} = await $authHost.get('api/certificate/user')
    return data
}

export const createCertificate = async (userId, courseId) => {
    const {data} = await $authHost.post(`api/certificate?courseId=${courseId}&userId=${userId}`)
    return data
}

export const getAllCertificates = async (id) => {
    const {data} = await $authHost.get(`api/certificate/${id}`)
    return data
}
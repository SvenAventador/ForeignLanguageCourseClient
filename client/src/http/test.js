import {$authHost, $host} from "./index";

export const getOne = async (id) => {
    const {data} = await $host.get(`api/test?id=${id}`)
    return data
}

export const create = async (test) => {
    const {data} = await $authHost.post('api/test', test)
    return data
}
import {$host} from "./index";

export const getOne = async (id) => {
    const {data} = await $host.get(`api/test?id=${id}`)
    return data
}
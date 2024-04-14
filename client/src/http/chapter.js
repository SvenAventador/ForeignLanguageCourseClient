import {$host} from "./index";

export const getOne = async (id) => {
    const {data} = await $host.get(`api/chapter?id=${id}`)
    return data
}
import {$authHost} from "./index";
import {jwtDecode} from "jwt-decode";

export const getStatistic = async (id) => {
    const {data} = await $authHost.get(`api/personal/${id}`)
    return data
}

export const update = async (id,
                             userNickname,
                             userEmail,
                             userPassword,
                             userSurname,
                             userName,
                             userPatronymic,
                             userPhone) => {
    const {data} = await $authHost.put(`api/personal/${id}`, {
        userNickname,
        userEmail,
        userPassword,
        userSurname,
        userName,
        userPatronymic,
        userPhone
    })
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token)
}
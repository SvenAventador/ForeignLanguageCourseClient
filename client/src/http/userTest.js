import {$authHost} from "./index";

export const createTest = async (testResult, testId, userId) => {
    const {data} = await $authHost.post('api/user-test/',
        {
            testResult,
            testId,
            userId
        })
    return data
}
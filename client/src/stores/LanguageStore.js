import {create as zustandCreate} from 'zustand';
import {
    getOne,
    getAll,
    create,
    update,
    deleteOne,
    deleteAll,
} from '../http/language';

export const useLanguage = zustandCreate((set) => ({
    currentLanguage: null,
    allLanguage: null,
    error: null,
    message: null,

    getOne: async (id) => {
        const data = await getOne(id)
        set({
            currentLanguage: data,
            error: null,
            message: null
        })
        return data
    },

    getAll: async () => {
        const data = await getAll()
        set({
            allLanguage: data,
            error: null,
            message: null
        })
        return data
    }
}))
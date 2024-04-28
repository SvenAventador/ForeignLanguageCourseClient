import {create as zustandCreate} from 'zustand';
import {
    create,
    getAll,
    getOne,
    update
} from '../http/language';

export const useLanguage = zustandCreate((set) => ({
    currentLanguage: null,
    allLanguage: null,
    error: null,
    message: null,

    setCurrentLanguage: (language) => {
        set({
            currentLanguage: language,
            error: null,
            message: null
        })
    },

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
    },

    create: async (languageName) => {
        try {
            const data = await create(languageName)
            set({
                currentLanguage: data
            })
            return data
        } catch (error) {
            set({
                currentLanguage: null,
                allLanguage: null,
                error: error.response.data.message,
                message: null
            });
            throw error
        }
    },

    update: async (id, languageName) => {
        try {
            const data = update(id, languageName)
            set({
                currentLanguage: data
            })
            return data
        } catch (error) {
            let errorMessage = 'Произошла ошибка при обновлении языка. Пожалуйста, попробуйте еще раз.';
            if (error.response && error.response.data && error.response.data.message && error.response.data.message.errors) {
                const errors = error.response.data.message.errors;
                errorMessage = errors.map(err => err.msg).join('\n');
            }

            set({
                currentLanguage: null,
                allLanguage: null,
                error: errorMessage,
                message: null
            });
            throw errorMessage
        }
    }
}))
import {create as zustandCreate} from 'zustand';
import {
    getOne,
    getAll,
    create,
    update,
    deleteOne,
    deleteAll,
} from '../http/course';

export const useCourse = zustandCreate((set) => ({
    currentCourse: null,
    allCourse: null,
    error: null,
    message: null,

    getOne: async (id) => {
        const data = await getOne(id)
        set({
            currentCourse: data,
            error: null,
            message: null
        })
        return data
    },

    getAll: async (languageId) => {
        const data = await getAll(languageId)
        set({
            allCourse: data,
            error: null,
            message: null
        })
        return data
    },

    create: async(course) => {
        try {
            const data = await create(course)
            set({
                currentCourse: data,
                error: null,
                message: null
            })
        } catch (error) {
            let errorMessage = 'Произошла ошибка при добавлении курса. Пожалуйста, попробуйте еще раз.';
            if (error.response && error.response.data && error.response.data.message && error.response.data.message.errors) {
                const errors = error.response.data.message.errors;
                errorMessage = errors.map(err => err.msg).join('\n');
            }

            set({
                currentCourse: null,
                error: errorMessage,
                message: null
            });
            throw errorMessage
        }
    },

    update: async (course) => {
        try {
            const data = await update(course)
            set({
                currentCourse: data,
                error: null,
                message: null
            })
        } catch (error) {
            let errorMessage = 'Произошла ошибка при обновлении курса. Пожалуйста, попробуйте еще раз.';
            if (error.response && error.response.data && error.response.data.message && error.response.data.message.errors) {
                const errors = error.response.data.message.errors;
                errorMessage = errors.map(err => err.msg).join('\n');
            }

            set({
                currentCourse: null,
                error: errorMessage,
                message: null
            });
            throw errorMessage
        }
    }
}))
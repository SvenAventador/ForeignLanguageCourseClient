import {create} from 'zustand';
import {
    check,
    login,
    logout,
    registration
} from '../http/user';
import {update} from "../http/personal";

export const useUser = create((set) => ({
        user: null,
        isAuth: false,
        error: null,
        message: null,

        registrationUser: async (userNickname, emailUser, passwordUser) => {
            try {
                const data = await registration(userNickname, emailUser, passwordUser);
                set({
                    user: data,
                    isAuth: true,
                    error: null,
                    message: null
                });
                return data
            } catch (error) {
                let errorMessage = 'Произошла ошибка при регистрации. Пожалуйста, попробуйте еще раз.';
                if (error.response && error.response.data && error.response.data.message && error.response.data.message.errors) {
                    const errors = error.response.data.message.errors;
                    errorMessage = errors.map(err => err.msg).join('\n');
                }

                set({
                    user: null,
                    isAuth: false,
                    error: errorMessage,
                    message: null
                });
                throw error
            }
        },

        loginUser: async (emailUser, passwordUser) => {
            try {
                const data = await login(emailUser, passwordUser);
                set({
                    user: data,
                    isAuth: true,
                    error: null,
                    message: null
                });
                return data
            } catch (error) {
                let errorMessage = 'Произошла ошибка при авторизации. Пожалуйста, попробуйте еще раз.';
                if (error.response && error.response.data && error.response.data.message && error.response.data.message.errors) {
                    const errors = error.response.data.message.errors;
                    errorMessage = errors.map(err => err.msg).join('\n');
                }

                set({
                    user: null,
                    isAuth: false,
                    error: errorMessage,
                    message: null
                });
                throw error
            }
        },

        checkUser: async () => {
            try {
                const data = await check();
                set({
                    user: data,
                    isAuth: true,
                    error: null,
                    message: null
                });
                return data;
            } catch (error) {
                set({
                    user: null,
                    isAuth: false,
                    error,
                    message: error.message
                });
            }
        },

        logoutUser: async () => {
            try {
                await logout();
                set({
                    user: null,
                    isAuth: false,
                    error: null,
                    message: null
                });
            } catch (error) {
                set({
                    user: null,
                    isAuth: false,
                    error,
                    message: error.message
                });
            }
        },

        updateUser: async (id,
                           userNickname,
                           userEmail,
                           userPassword,
                           userSurname,
                           userName,
                           userPatronymic,
                           userPhone
        ) => {
            try {
                const data = await update(
                    id,
                    userNickname,
                    userEmail,
                    userPassword,
                    userSurname,
                    userName,
                    userPatronymic,
                    userPhone
                );
                set({
                    user: data,
                    isAuth: true,
                    error: null,
                    message: null
                });
                return data
            } catch (error) {
                set({
                    isAuth: true,
                    error: error.response.data.message,
                    message: null
                });
                throw error
            }
        },
    })
);
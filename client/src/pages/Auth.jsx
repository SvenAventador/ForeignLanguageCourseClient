import React from 'react';
import {
    NavLink,
    useLocation,
    useNavigate
} from "react-router-dom";
import {
    LOGIN_PATH,
    MAIN_PATH,
    REGISTRATION_PATH
} from "../utils/consts";
import {useUser} from "../stores/UserStore";
import Swal from "sweetalert2";

const Auth = () => {
    const location = useLocation().pathname === LOGIN_PATH
    const navigate = useNavigate()

    const [userNickname, setUserNickname] = React.useState('')
    const [userEmail, setUserEmail] = React.useState('')
    const [userPassword, setUserPassword] = React.useState('')
    const [confirmPassword, setConfirmPassword] = React.useState('')

    const {
        registrationUser,
        loginUser
    } = useUser()

    const registration = (event) => {
        event.preventDefault()
        registrationUser(userNickname, userEmail, userPassword)
            .then(() => {
                Swal.fire({
                    title: 'Ваушки!',
                    text: 'Добро пожаловать, друг ❤️‍🔥',
                    icon: 'success'
                }).then(() => {
                    navigate(MAIN_PATH);
                })
            })
            .catch((error) => {
                return Swal.fire({
                    title: 'Опачки!',
                    text: error,
                    icon: 'error'
                });
            });
    }

    const login = (event) => {
        event.preventDefault()
        loginUser(userEmail, userPassword)
            .then(() => {
                Swal.fire({
                    title: 'Ваушки!',
                    text: 'Добро пожаловать, друг 🥰',
                    icon: 'success'
                }).then(() => {
                    navigate(MAIN_PATH);
                })
            })
            .catch((error) => {
                return Swal.fire({
                    title: 'Опачки!',
                    text: error,
                    icon: 'error'
                });
            });
    }

    return (
        <section className="auth">
            <form className="auth__form" onSubmit={registration}>
                <div className="auth__form--title">
                    <h1>{location ? 'Авторизация' : 'Регистрация'}</h1>
                </div>
                {
                    !location && (
                        <div className="auth__form--field">
                            <input name="username"
                                   type="text"
                                   required
                                   autoComplete="off"
                                   value={userNickname}
                                   onChange={(e) => setUserNickname(e.target.value)}/>
                            <label htmlFor="username">Введите Ваш никнейм</label>
                        </div>
                    )
                }
                <div className="auth__form--field">
                    <input name="email"
                           type="text"
                           required
                           autoComplete="off"
                           value={userEmail}
                           onChange={(e) => setUserEmail(e.target.value)}/>
                    <label htmlFor="email">Введите Вашу почту</label>
                </div>
                <div className="auth__form--field">
                    <input name="password"
                           type="password"
                           required
                           autoComplete="off"
                           value={userPassword}
                           onChange={(e) => setUserPassword(e.target.value)}/>
                    <label htmlFor="password">Введите пароль</label>
                </div>
                {
                    !location && (
                        <div className="auth__form--field">
                            <input name="confirmPassword"
                                   type="password"
                                   required
                                   autoComplete="off"
                                   value={confirmPassword}
                                   onChange={(e) => setConfirmPassword(e.target.value)}/>
                            <label htmlFor="confirmPassword">Повторите пароль</label>
                        </div>
                    )
                }

                <button className="auth__form--submit btn-reset"
                        onClick={location ? login : registration}
                        type="submit">
                    {
                        location ? 'Войти' : 'Зарегистрироваться'
                    }
                </button>

                <NavLink to={location ? REGISTRATION_PATH : LOGIN_PATH}
                         className="auth__form--link">
                    {location ? (
                        <>
                            Нет аккаунт? <span>Зарегистрируйтесь!</span>
                        </>
                    ) : (
                        <>
                            Уже есть аккаунт? <span>Войдите!</span>
                        </>
                    )}
                </NavLink>
            </form>
        </section>
    );
};

export default Auth;

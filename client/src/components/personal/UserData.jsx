import React from 'react';
import {useUser} from "../../stores/UserStore";
import Swal from "sweetalert2";
import {useNavigate} from "react-router-dom";
import InputMask from "react-input-mask";
import {MAIN_PATH} from "../../utils/consts";
const UpdateUserDataForm = () => {
    const {
        user,
        updateUser,
        logoutUser
    } = useUser()

    const [userNickname, setUserNickname] = React.useState(user?.userNickname || '');
    const [userEmail, setUserEmail] = React.useState(user?.userEmail || '');
    const [userPassword, setUserPassword] = React.useState('');
    const [userSurname, setUserSurname] = React.useState(user?.userSurname || '');
    const [userName, setUserName] = React.useState(user?.userName || '');
    const [userPatronymic, setPatronymic] = React.useState(user?.userPatronymic || '');
    const [userPhone, setUserPhone] = React.useState(user?.userPhone || '')
    const emailRegex = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu
    const history = useNavigate()

    const handleFormSubmit = (e) => {
        e.preventDefault()
        if (userNickname === '')
            return Swal.fire({
                icon: 'error',
                title: 'Внимение!',
                text: "Пожалуйста, введите корректное имя!"
            })
        if (userEmail === '' || !emailRegex.test(userEmail))
            return Swal.fire({
                icon: 'error',
                title: 'Внимение!',
                text: "Пожалуйста, введите корректную почту!"
            })
        if (userPassword && userPassword.length < 8)
            return Swal.fire({
                icon: 'error',
                title: 'Внимение!',
                text: "Минимальная длина пароля 8 символов!"
            })

        updateUser(
            user.id,
            userNickname,
            userEmail,
            userPassword,
            userSurname,
            userName,
            userPatronymic,
            userPhone
        ).then(() => {
            return Swal.fire({
                title: 'Ваушки!',
                text: 'Ваши данные успешно обновлены!',
                icon: 'success'
            })
        }).catch((error) => {
            return Swal.fire({
                title: 'Внимание!',
                text: error.response.data.message,
                icon: 'error'
            })
        })
    }

    const handleLogout = () => {
        logoutUser().then(() => {
            Swal.fire({
                title: "Внимание",
                text: 'До скорых встреч, друг! Ждем тебя снова! ❤️',
                icon: "success"
            }).then(() => {
                history(MAIN_PATH);
            });
        })
    }

    return (
        <div className="update-user-data-form">
            <h2 className="update-user-data-form__title">Обновление данных</h2>
            <div className="update-user-data-form__form">
                <label className="update-user-data-form__label">
                    Ваш никнейм:
                    <input
                        type="text"
                        value={userNickname}
                        onChange={(e) => setUserNickname(e.target.value)}
                        className="update-user-data-form__input"
                    />
                </label>
                <label className="update-user-data-form__label">
                    Ваша почта:
                    <input type="email"
                           value={userEmail}
                           onChange={(e) => setUserEmail(e.target.value)}
                           className="update-user-data-form__input"
                    />
                </label>
                <label className="update-user-data-form__label">
                    Ваш пароль:
                    <input type="password"
                           value={userPassword}
                           onChange={(e) => setUserPassword(e.target.value)}
                           className="update-user-data-form__input"
                    />
                </label>
                <label className="update-user-data-form__label">
                    Ваша фамилия:
                    <input type="text"
                           value={userSurname}
                           onChange={(e) => setUserSurname(e.target.value)}
                           className="update-user-data-form__input"
                    />
                </label>
                <label className="update-user-data-form__label">
                    Ваше имя:
                    <input type="text"
                           value={userName}
                           onChange={(e) => setUserName(e.target.value)}
                           className="update-user-data-form__input"
                    />
                </label>
                <label className="update-user-data-form__label">
                    Ваше отчество (при наличии):
                    <input type="text"
                           value={userPatronymic}
                           onChange={(e) => setPatronymic(e.target.value)}
                           className="update-user-data-form__input"
                    />
                </label>
                <label className="update-user-data-form__label">
                    Ваш номер телефона
                    <InputMask type="text"
                               mask="+7 (999) 999 99-99"
                               value={userPhone}
                               onChange={(e) => setUserPhone(e.target.value)}
                               autoComplete="false"
                               className="update-user-data-form__input"
                    />
                </label>
                <button className="update-user-data-form__submit-btn"
                        onClick={handleFormSubmit}>
                    Обновить данные
                </button>
                <button className="btn-reset update-user-data-form__logout-btn"
                        onClick={handleLogout}>
                    Выйти из аккаунта
                </button>
            </div>
        </div>
    );
};

export default UpdateUserDataForm;

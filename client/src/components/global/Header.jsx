import React from 'react';
import {
    NavLink,
    useNavigate
} from "react-router-dom";
import {
    COURSES_PATH,
    LOGIN_PATH,
    MAIN_PATH,
    PERSONAL_PATH
} from "../../utils/consts";
import {useUser} from "../../stores/UserStore";
import {ReactComponent as Auth} from "../../assets/user.svg";

const Header = () => {
    const {
        user
    } = useUser()

    const navigate = useNavigate()

    return (
        <header className="header">
            <div className="header__container">
                <div className="header__logo">
                    <NavLink to={MAIN_PATH}>
                        foreign language course
                    </NavLink>
                </div>
                <nav className="header__navigation">
                    <ul className="navigation__list">
                        <li className="navigation__item">
                            <NavLink to={COURSES_PATH}
                                     className="navigation__link">
                                наши курсы
                            </NavLink>
                        </li>
                    </ul>
                </nav>

                <div className="header__user"
                     onClick={() =>
                         user ? navigate(`${PERSONAL_PATH}/${user.id}`)
                              : navigate(LOGIN_PATH)
                     }>
                    <Auth width={35}
                          height={35}/>
                    <span>{user ? user.userNickname
                                : 'Войти'}</span>
                </div>
            </div>
        </header>
    )
}

export default Header
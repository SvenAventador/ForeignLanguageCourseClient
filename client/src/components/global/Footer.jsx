import React from 'react';
import {NavLink} from "react-router-dom";

const Footer = () => {
    React.useEffect(() => {
        document.getElementById('currentDate').innerHTML = new Date().getFullYear() + ' Все права защищены';
    }, []);

    return (
        <footer className="footer">
            <div className="footer__container">
                <address className="footer-contacts">
                    <div className="footer-contacts__left">
                        <ul className="footer-contacts__phone">
                            <li className="footer-contacts__phone-item">
                                <NavLink to="tel:8 (800) 500-09-22">
                                    8 (800) 500-09-22
                                </NavLink>
                                <span>Контактный центр</span>
                            </li>
                            <li className="footer-contacts__phone-item">
                                <NavLink to="tel:8 (984) 222-31-22">
                                    8 (984) 222-31-22
                                </NavLink>
                                <span>Отдел заботы о пользователе</span>
                            </li>
                        </ul>
                    </div>

                    <div className="footer-contacts__right">
                        <p>г. Казань, ул. Большая Красная, дом 55, этаж 1, комната 116</p>
                        <NavLink to="mailto: college-of-information-echnology@kit.kit">
                            college-of-information-technology@kit.kit
                        </NavLink>
                    </div>
                </address>

                <div className="footer__about">
                    <p>
                        Мы используем <span>файлы cookie</span>, для персонализации сервисов и повышения удобства
                        пользования сайтом.
                        Если вы не согласны на их использование, поменяйте настройки браузера.
                    </p>
                    <p>
                        Образовательные услуги оказываются ЧОУ ДПО «Образовательные технологии «ForeignLanguageCourse
                        (Курсы Иностранных Языков)»
                        на основании Лицензии № Л035-01298-77/00179609 от 19 января 2022 года.
                    </p>
                    <p>
                        Правообладатель ПО LMS «ForeignLanguageCourse 2.0» ООО «ИностранныеКурсы».
                    </p>
                </div>

                <div className="footer__copy">
                    <span>&copy; ForeignLanguageCourse</span>
                    <span id="currentDate"></span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

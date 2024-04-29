import React from 'react';
import person from '../../assets/about.png'

const About = () => {
    return (
        <section className="about">
            <div className="about__container">
                <div className="about-top">
                    <h2>
                        Компаниям нужны Специалисты со знанием иностранных языков
                    </h2>
                    <img src={person}
                         alt="programmer"
                         aria-label="programmer"/>
                </div>
                <div className="about-center">
                    Изучение иностранных языков - это ключевой аспект обогащения личности и профессионального роста.
                    Сегодня в мире существует более 7000 языков, и способность общаться на нескольких из них открывает
                    широкие горизонты для личного и карьерного развития. Глобализация делает знание иностранных языков
                    крайне важным,
                    так как позволяет эффективно взаимодействовать с людьми из различных культур и стран.
                </div>
                <div className="about-bottom">
                    <div className="about-bottom__help">
                        <div>
                            Востребовано
                        </div>
                        <p>
                            В январе 2023 г. число подобных вакансий в России на 43% больше, чем год назад.
                            За месяц 60 тыс. новых вакансий
                        </p>
                        <div>
                            Источник: hh.ru
                        </div>
                    </div>
                    <div className="about-bottom__help">
                        <div>
                            Перспективно
                        </div>
                        <p>
                            К 2035 году в России будет более 2,5 млн вакансий для специалистов, которым требуется знание
                            языков.
                        </p>
                        <div>
                            Источник: Минцифры России
                        </div>
                    </div>
                    <div className="about-bottom__help">
                        <div>
                            Высокооплачиваемо
                        </div>
                        <p>
                            Зарплата начинающего специалиста — от 60 000 ₽. А уже через три года — от 150 000 ₽
                        </p>
                        <div>
                            Источник: Минцифры России
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default About
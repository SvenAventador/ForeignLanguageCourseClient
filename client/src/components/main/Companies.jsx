import React from 'react';
import {NavLink} from "react-router-dom";

import beegeek from "../../assets/company/beegeek.svg"
import bfu from "../../assets/company/bfu.svg"
import bi from "../../assets/company/bi.svg"
import csc from "../../assets/company/csc.svg"
import dvu from "../../assets/company/dvu.svg"
import euspb from "../../assets/company/euspb.svg"
import mgimo from "../../assets/company/mgimo.svg"
import ru from "../../assets/company/ru.svg"
import samsung from "../../assets/company/samsung.svg"
import tgu from "../../assets/company/tgu.svg"
import vk from "../../assets/company/vk.svg"
import yandex from "../../assets/company/yandex.svg"

const companiesData = [
    {
        src: samsung,
        alt: "Samsung",
        link: "https://www.samsung.com/ru/"
    },
    {
        src: yandex,
        alt: "Yandex",
        link: "https://yandex.ru/jobs/vacancies/"
    },
    {
        src: vk,
        alt: "VKontakte",
        link: "https://vk.com/jobs"
    },
    {
        src: csc,
        alt: "Computer Science Center",
        link: "https://compscicenter.ru/"
    },
    {
        src: bi,
        alt: "Bioinformatics Institute",
        link: "https://bioinf.me/"
    },
    {
        src: ru,
        alt: "Moscow Peoples' Friendship University",
        link: "https://www.rudn.ru/"
    },
    {
        src: beegeek,
        alt: "Beegeek",
        link: "https://beegeek.tilda.ws/main"
    },
    {
        src: dvu,
        alt: "Far Eastern Federal University",
        link: "https://www.dvfu.ru/"
    },
    {
        src: mgimo,
        alt: "Moscow State Institute of International Relations",
        link: "https://mgimo.ru/"
    },
    {
        src: bfu,
        alt: "Baltic Federal University",
        link: "https://kantiana.ru/"
    },
    {
        src: euspb,
        alt: "European Saint-Petersburg University",
        link: "https://eusp.org/"
    },
    {
        src: tgu,
        alt: "Tomsk State University",
        link: "https://www.tsu.ru/"
    },
]


const Companies = () => {
    return (
        <section className="companies">
            <div className="companies__container">
                <div className="companies__title">
                    <h2>
                        Нас рекомендуют
                    </h2>
                </div>
                <div className="companies__icon">
                    {companiesData.map((company, index) => {
                        return (
                            <NavLink key={index}
                                     to={company.link}
                                     target="_blank"
                                     rel="noopener noreferrer">
                                <img src={company.src}
                                     alt={company.alt}/>
                            </NavLink>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}

export default Companies
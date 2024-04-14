import React from "react";
import {useLanguage} from "../../../stores/LanguageStore";

const Language = () => {
    const [languageList, setLanguageList] = React.useState([])
    let {
        getOne,
        getAll,
        currentLanguage
    } = useLanguage()

    React.useEffect(() => {
        getAll().then(({languages}) => {
            setLanguageList(languages)
        })
    }, [getAll])

    return (
        <div className="sorting">
            <h3 className="sorting__title">Иностранные языки</h3>
            <ul className="sorting__list">
                {languageList.length > 0 ?
                    (languageList.map(item => (
                        <li className="sorting__list--item"
                            key={item.id}
                            onClick={() => getOne(item.id)}>
                            <p>{item.languageName}</p>
                        </li>
                    ))) : (
                        <h2 style={{
                            textAlign: 'center'
                        }}>Пустоватенько...</h2>
                    )}
            </ul>
            <button className="sorting__btn btn-reset"
                onClick={() => currentLanguage = null}>
                Очистить выборку
            </button>
        </div>
    );
};

export default Language;

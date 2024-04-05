import React from 'react';

const Language = () => {
    const language = [
        {
            id: 1,
            name: '123'
        },
        {
            id: 2,
            name: '123'
        },
        {
            id: 3,
            name: '123'
        }
    ]
    return (
        <div className="sorting__list">
            {
                language && language.length > 0 ? (
                    <div className="sorting__list--item">
                        <p>{}</p>
                    </div>
                ) : (
                    <p>
                        Ничего не найдено!
                    </p>
                )
            }
        </div>
    );
};

export default Language;

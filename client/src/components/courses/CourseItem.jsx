import React from 'react';

const CourseItem = ({list}) => {

    return (
        <div className="course">
            <div className="course__title">
                <h3>
                    {list.name}
                </h3>
            </div>
            <div className="course__description">
                <p>
                    {list.description}
                </p>
            </div>
            <div className="course__duration">
                <p>
                    {list.duration}
                </p>
            </div>
            <div className="course__buttons">
                <button className="btn-reset">
                    Подробнее
                </button>
                <button className="btn-reset">
                    Записаться
                </button>
            </div>
        </div>
    );
};

export default CourseItem;

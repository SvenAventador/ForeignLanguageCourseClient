import React from 'react';
import CourseItem from "./CourseItem";

const CourseList = () => {
    const list = [
        {
            id: 1,
            name: 'Курс1',
            description: '123123123',
            duration: '6 месяцев'
        },
        {
            id: 2,
            name: 'Курс2',
            description: '123123123',
            duration: '6 месяцев'
        },
        {
            id: 3,
            name: 'Курс3',
            description: '123123123',
            duration: '6 месяцев'
        }
    ]
    return (
        <div className="course__list">
            {
                list && list.length > 0 ? (
                    list.map((listData) => (
                        <CourseItem key={listData.id}
                                    list={listData}/>
                    ))
                ) : (
                    <p>
                        По вашему запросу курс(-ы) не найден(-ы)!
                    </p>
                )
            }
        </div>
    );
};

export default CourseList;

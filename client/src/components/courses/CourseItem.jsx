import React from 'react';
import ModalComponent from "../modal/ModalComponent";
import {useNavigate} from "react-router-dom";
import {CURRENT_COURSE_PATH} from "../../utils/consts";

const CourseItem = ({course}) => {
    const [modalActive, setModalActive] = React.useState(false);
    const navigate = useNavigate();

    return (
        <div className="course-item"
             onClick={() => {
                 navigate(`${CURRENT_COURSE_PATH}/${course.id}`)
             }}>
            <img className="course-item__image"
                 src={`${process.env.REACT_APP_API_PATH}/${course.courseImage}`}
                 alt="Course Thumbnail"/>
            <h3 className="course-item__title">{course.courseName}</h3>
            <button className="btn-reset course-item__btn"
                    onClick={(e) => {
                        e.stopPropagation()
                        setModalActive(true)
                    }}>
                Подробнее о курсе
            </button>
            <ModalComponent active={modalActive} setActive={setModalActive}>
                <p className="course-info__header">Информация о курсе</p>
                <p className="course-info__detail">Название курса: {course.courseName}</p>
                <p className="course-info__detail">Описание курса: {course.courseDescription}</p>
                <p className="course-info__detail">Продолжительность курса: {course.duration.durationValue}</p>
                <p className="course-info__detail">Выбранный иностранный язык курса: {course.language.languageName}</p>
                <p className="course-info__detail">Уровень данного курса: {course.courseLevel}</p>
            </ModalComponent>
        </div>
    );
};

export default CourseItem;
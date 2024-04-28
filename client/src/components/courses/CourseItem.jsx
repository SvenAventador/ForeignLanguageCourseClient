import React from 'react';
import ModalComponent from "../modal/ModalComponent";
import {useNavigate} from "react-router-dom";
import {CURRENT_COURSE_PATH} from "../../utils/consts";
import {enrollACourse} from "../../http/course";
import Swal from "sweetalert2";
import {useUser} from "../../stores/UserStore";

const CourseItem = ({course}) => {
    const [modalActive, setModalActive] = React.useState(false)
    const {
        user
    } = useUser()
    const navigate = useNavigate();

    return (
        <div className="course-item">
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
            <button className="btn-reset course-item__btn"
                    onClick={() => {
                        try {
                            if (user) {
                                enrollACourse(user?.id, course.id).then((data) => {
                                    Swal.fire({
                                        title: 'Йей!',
                                        text: 'Рады видеть Вас!',
                                        icon: 'success'
                                    }).then(() => {
                                        navigate(`${CURRENT_COURSE_PATH}/${course.id}`)
                                    })
                                })
                            } else {
                                return Swal.fire({
                                    title: 'Опачки!',
                                    text: 'Записаться на курс могут лишь авторизованные пользователи!',
                                    icon: 'error'
                                })
                            }
                        } catch (error) {
                            let errorMessage = 'Произошла ошибка при записи на курса. Пожалуйста, попробуйте еще раз.';
                            if (error.response && error.response.data && error.response.data.message && error.response.data.message.errors) {
                                const errors = error.response.data.message.errors;
                                errorMessage = errors.map(err => err.msg).join('\n');
                            }

                            return Swal.fire({
                                title: 'Опачки!',
                                text: errorMessage,
                                icon: 'error'
                            })
                        }
                    }}>
                Записаться на курс
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
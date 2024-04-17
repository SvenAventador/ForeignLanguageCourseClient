import React from 'react';
import {
    useNavigate,
    useParams
} from "react-router-dom";
import {useCourse} from "../../stores/CourseStore";
import {ThreeCircles} from "react-loader-spinner";
import {CHAPTER_PATH} from "../../utils/consts";

const Course = () => {
    const {id} = useParams()
    const [oneCourse, setOneCourse] = React.useState([])
    const [isLoading, setIsLoading] = React.useState(true)
    const navigate = useNavigate()
    const {getOne} = useCourse()

    React.useEffect(() => {
        setTimeout(() => {
            getOne(id).then(({course}) => {
                setOneCourse(course)
            }).then(() => {
                setIsLoading(false)
            })
        }, 2000)
    }, [getOne, id])

    if (isLoading) {
        return <div className="app__circle">
            <ThreeCircles
                visible={true}
                height="100"
                width="100"
                color="#006e6e"
                ariaLabel="three-circles-loading"
                wrapperStyle={{}}
                wrapperClass=""
            />
        </div>
    }

    return (
        <section className="course-content">
            <div className="course-content__container">
                <div className="course-content__left">
                    {oneCourse && (
                        <>
                            <img src={`${process.env.REACT_APP_API_PATH}/${oneCourse.courseImage}`} alt="course card"/>
                            <p>Название курса: {oneCourse.courseName}</p>
                        </>
                    )}
                </div>
                <div className="course-content__right">
                    <div className="course-content__list">
                        {oneCourse && oneCourse.course_contents && oneCourse.course_contents.length > 0 ? (
                            oneCourse.course_contents.map((item, index) => (
                                <div className="course-content__item" key={index}
                                     onClick={() => navigate(`${CHAPTER_PATH}/${item.id}`)}>
                                    <p>
                                        Глава {index + 1}. {item.chapterName}
                                    </p>
                                </div>
                            ))
                        ) : (
                            <p>У данного курса не найдено глав!</p>
                        )}
                    </div>
                </div>
            </div>
        </section>
    )
}
export default Course;

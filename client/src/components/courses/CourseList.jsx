import React from "react";
import CourseItem from "./CourseItem";
import { useCourse } from "../../stores/CourseStore";
import { useLanguage } from "../../stores/LanguageStore";

const CourseList = () => {
    const [courseList, setCourseList] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const { getAll } = useCourse();
    const { currentLanguage } = useLanguage();

    React.useEffect(() => {
        setLoading(true)
        getAll(null).then(({ courses }) => {
            setCourseList(courses.rows)
            setTimeout(() => {
                setLoading(false)
            }, 1000)
        })
    }, [currentLanguage, getAll])

    React.useEffect(() => {
        setLoading(true)
        getAll(currentLanguage?.language.id).then(({ courses }) => {
            setCourseList(courses.rows);
            setTimeout(() => {
                setLoading(false)
            }, 1000)
        })
    }, [currentLanguage, getAll]);

    return (
        <div className="course-list">
            {loading ? (
                <h2>Загрузка курсов...</h2>
            ) : courseList.length > 0 ? (
                <div className="course-list__grid">
                    {courseList.map(course => (
                        <CourseItem key={course.id} course={course} />
                    ))}
                </div>
            ) : (
                <h2 style={{
                    fontSize:'20pt',
                    fontFamily: 'Comic Sans MS'
                }}>По вашему запросу ничего не найдено!</h2>
            )}
        </div>
    );
};

export default CourseList;
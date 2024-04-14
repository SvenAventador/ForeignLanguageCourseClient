import React from "react";
import CourseItem from "./CourseItem";
import { useCourse } from "../../stores/CourseStore";
import { useLanguage } from "../../stores/LanguageStore";

const CourseList = () => {
    const [courseList, setCourseList] = React.useState([]);
    const { getAll } = useCourse();
    let { currentLanguage } = useLanguage();

    /// TODO Сделать сортировку!
    React.useEffect(() => {
            getAll(currentLanguage?.language.id).then(({ courses }) => {
                setCourseList(courses.rows);
            })
    }, [currentLanguage, getAll])

    return (
        <div className="course-list">
            {courseList.length > 0 ? (
                <div className="course-list__grid">
                    {courseList.map(course => (
                        <CourseItem key={course.id} course={course} />
                    ))}
                </div>
            ) : (
                <h2>По вашему запросу ничего не найдено!</h2>
            )}
        </div>
    );
};

export default CourseList;
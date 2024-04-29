import React from 'react';
import CourseList from "../components/courses/CourseList";
import Language from "../components/courses/sort/Language";

const Courses = () => {
    return (
        <div className="courses">
            <div className="courses__container">
                <Language />
                <CourseList />
            </div>
        </div>
    )
}

export default Courses
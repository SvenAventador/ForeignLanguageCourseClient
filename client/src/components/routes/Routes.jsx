import React from 'react';
import {
    BrowserRouter,
    Route,
    Routes
} from "react-router-dom";
import {
    MAIN_PATH,
    REGISTRATION_PATH,
    LOGIN_PATH,
    PERSONAL_PATH,
    COURSES_PATH,
    CURRENT_COURSE_PATH,
    CHAPTER_PATH
} from "../../utils/consts";
import Header from "../global/Header";
import FooterComponent from "../global/Footer";
import Auth from "../../pages/Auth";
import Main from "../../pages/Main";
import PersonalAccount from "../../pages/user/PersonalAccount";
import Courses from "../../pages/Courses";
import Course from "../../pages/user/Course";
import Chapter from "../../pages/user/Chapter";
import {useUser} from "../../stores/UserStore";

const Layout = ({children}) => {
    return (
        <>
            <Header/>
            <main className="main">
                {children}
            </main>
            <FooterComponent/>
        </>
    );
};

const SiteNavigation = () => {
    const {
        user
    } = useUser()

    return (
        <BrowserRouter>
            <Routes>
                <Route path={MAIN_PATH}
                       element={
                           <Layout>
                               <Main/>
                           </Layout>
                       }/>
                <Route path={COURSES_PATH}
                       element={
                           <Layout>
                               <Courses/>
                           </Layout>
                       }/>
                <Route path={CURRENT_COURSE_PATH + '/:id'}
                       element={
                           <Layout>
                               <Course/>
                           </Layout>
                       }/>
                <Route path={CHAPTER_PATH + '/:id'}
                       element={
                           <Layout>
                               <Chapter/>
                           </Layout>
                       }/>

                <Route path={REGISTRATION_PATH} element={
                    <main className="main">
                        <Auth/>
                    </main>
                }/>
                <Route path={LOGIN_PATH} element={
                    <main className="main">
                        <Auth/>
                    </main>
                }/>

                <Route path={PERSONAL_PATH + '/:id'}
                       element={
                           user && user.userRole === 'USER'
                               ?
                               <Layout>
                                   <PersonalAccount/>
                               </Layout>
                               :
                               <Layout>
                                   <Main/>
                               </Layout>
                       }/>
            </Routes>
        </BrowserRouter>
    );
};

export default SiteNavigation;
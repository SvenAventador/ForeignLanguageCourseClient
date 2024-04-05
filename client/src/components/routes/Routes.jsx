import React from 'react';
import {
    BrowserRouter,
    Route,
    Routes
} from "react-router-dom";

import Auth from "../../pages/Auth";
import Main from "../../pages/Main";

import {
    MAIN_PATH,
    REGISTRATION_PATH,
    LOGIN_PATH,
    PERSONAL_PATH,
    COURSES_PATH,
    CURRENT_COURSE_PATH
} from "../../utils/consts";
import Header from "../global/Header";
import FooterComponent from "../global/Footer";
import {useUser} from "../../stores/UserStore";
import PersonalAccount from "../../pages/user/PersonalAccount";
import Courses from "../../pages/Courses";
import Course from "../../pages/Course";

const Layout = ({children}) => {
    return (
        <>
            <Header/>
            {children}
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

                <Route path={REGISTRATION_PATH} element={<Auth/>}/>
                <Route path={LOGIN_PATH} element={<Auth/>}/>

                <Route path={PERSONAL_PATH + '/:id'}
                       element={
                           user && user.userRole === 'USER'
                               ?
                               <Layout>
                                   <PersonalAccount/>
                               </Layout>
                               :
                               <Main/>
                       }/>
            </Routes>
        </BrowserRouter>
    );
};

export default SiteNavigation;
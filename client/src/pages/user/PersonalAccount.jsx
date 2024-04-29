import React from 'react';
import {useParams} from "react-router-dom";
import CoursesTable from "../../components/personal/CoursesTable";
import UpdateUserDataForm from "../../components/personal/UserData";
import CertificateTable from "../../components/personal/CertificateTable";

const PersonalAccount = () => {
    const {id} = useParams()

    return (
        <section className="personal">
            <div className="personal__container">
                <div style={{
                    width: '100%'
                }}>
                    <CoursesTable id={id}/>
                    <CertificateTable id={id}/>
                </div>
                <UpdateUserDataForm/>
            </div>
        </section>
    )
}

export default PersonalAccount

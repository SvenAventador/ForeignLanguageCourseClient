import React from 'react';
import {useParams} from "react-router-dom";

const PersonalAccount = () => {
    const {id} = useParams()
    console.log(id)
    return (
        <div>
            Personal
        </div>
    );
};

export default PersonalAccount;

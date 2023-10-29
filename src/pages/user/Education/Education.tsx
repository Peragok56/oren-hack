// React
import React, { useCallback, useEffect, useState } from "react";
// Styles
import styles from './Education.module.css'
import UpBar from "../../../components/UpBar/UpBar";
import ModalFileUpload from "../../../components/ModalFileUpload/ModalFileUpload";
import axios from "../../../axios/axios";
import { getCookie } from "../../../auth/authMethod";
import Swal from "sweetalert2";
import EducationCard from "../../../components/EducationCard/EducationCard";

const UserEducation = () => {
    const [educations, setEducations] = useState<any[]>([])

    useEffect(() => {
        axios.get('/education/findAll', {headers: {Authorization: `Bearer ${getCookie('accessToken')}`}})
        .then(res => {
            console.log(res.data);
            setEducations(res.data)
        })
        .catch(err => {
            Swal.fire({
                icon: 'error',
                title: 'Ой',
                text: `${err.response.data.message}`,
              })
        })
    }, [])

    return(
        <div className={styles[`container`]}>

            <UpBar />

            <div className={styles[`users-block`]}>


                <div className={styles[`users-block-list`]}>
                <h1 className={styles[`users-block-label`]}>
                    Учебный материал
                </h1>

                    <div className={styles[`block-list`]}>
                        {educations.map((education: any) => 
                            <EducationCard 
                                education={education}
                            />
                        )}
                    </div>
                </div>
            </div>

        </div>
    )
}

export default UserEducation
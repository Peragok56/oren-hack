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

const Education = () => {
    const [educations, setEducations] = useState<any[]>([])

    const [modalUpload, setModalUpload] = useState<boolean>(false)

    const switchVisibility = useCallback(() => {
        setModalUpload(prev => !prev)
    }, [])

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

    const refreshEducation = () => {
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
    }

    const removeEducation = (id: number) => {
        axios.delete(`/education/remove/${id}`, {headers: {Authorization: `Bearer ${getCookie('accessToken')}`}})
        .then(res => {
            refreshEducation()
        })
        .catch(err => {
            Swal.fire({
                icon: 'error',
                title: 'Ой',
                text: `${err.response.data.message}`,
              })
        })
    }

    return(
        <div className={styles[`container`]}>

            <UpBar />

            <div className={styles[`users-block`]}>


                <div className={styles[`users-block-list`]}>
                <h1 className={styles[`users-block-label`]}>
                    Учебный материал

                    <button className={styles[`actionButton`]} onClick={switchVisibility}>
                        Добавить
                    </button>
                </h1>

                    <div className={styles[`block-list`]}>
                        {educations.map((education: any) => 
                            <EducationCard 
                                education={education}
                                removeEducation={() => removeEducation(education.id)}
                            />
                        )}
                    </div>
                </div>
            </div>

            <ModalFileUpload 
                isOpen={modalUpload}
                switchVisibility={switchVisibility}
                refreshEducation={refreshEducation}
            />

        </div>
    )
}

export default Education
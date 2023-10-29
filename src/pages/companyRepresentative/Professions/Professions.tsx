// React
import React, { useCallback, useEffect, useState } from "react";
// Styles
import styles from './Professions.module.css'
import UpBar from "../../../components/UpBar/UpBar";
import ModalProfessionCreate from "../../../components/ModalProfessionCreate/ModalProfessionCreate";
import axios from "../../../axios/axios";
import { getCookie } from "../../../auth/authMethod";

const Professions = () => {

    const [modalCreateProfession, setModalCreateProffession] = useState<boolean>(false)
    const [occupations, setOccupations] = useState<any[]>([])

    const switchVisibility = useCallback(() => {
        setModalCreateProffession(prev => !prev)
    }, [])

    useEffect(() => {
        axios.get('/roles-company/findAll', {headers: {Authorization: `Bearer ${getCookie('accessToken')}`}})
        .then(res => {
            setOccupations(res.data)
        })
    }, [])

    const reegreshOccupation = () => {
        axios.get('/roles-company/findAll', {headers: {Authorization: `Bearer ${getCookie('accessToken')}`}})
        .then(res => {
            setOccupations(res.data)
        })
    }

    const removeProfession = (id: number) => {
        axios.delete(`/roles-company/remove/${id}`, {headers: {Authorization: `Bearer ${getCookie('accessToken')}`}})
        .then(res => {
            axios.get('/roles-company/findAll', {headers: {Authorization: `Bearer ${getCookie('accessToken')}`}})
            .then(res => {
                setOccupations(res.data)
            })
        })
    }

    return(
        <div className={styles[`container`]}>

            <UpBar />

            <div className={styles[`users-block`]}>


                <div className={styles[`users-block-list`]}>
                <h1 className={styles[`users-block-label`]}>
                    Профессии в организации

                    <button className={styles[`actionButton`]} onClick={switchVisibility}>
                        Добавить
                    </button>
                </h1>

                    <div className={styles[`block-list`]}>
                        {occupations.map((occupation: any) => 
                            <div className={styles.occupationCard}>
                                <div className={styles.occupationCardLabel}>{occupation.nameRole}</div>

                                <button className={styles.occupationCardButton} onClick={() => removeProfession(occupation.id)}>
                                    Удалить
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <ModalProfessionCreate 
                switchVisibility={switchVisibility}
                isOpen={modalCreateProfession}
                refreshOccupation={reegreshOccupation}
            />
        </div>
    )
}

export default Professions
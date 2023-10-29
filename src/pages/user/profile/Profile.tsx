// React
import React, { useCallback, useEffect, useState } from "react";
// Styles
import styles from './Profile.module.css'
// Coponents
import UpBar from "../../../components/UpBar/UpBar";
// hooks
import { useTypedSelector } from "../../../hooks/userTypedSelector";
import { profileAction } from "../../../hooks/profileAction";
// Date Format
import { format } from 'date-fns';
import ruLocale from 'date-fns/locale/ru';
import ModalUpdateProfile from "../../../components/ModalUpdateProfile/ModalUpdateProfile";
import { localVariables } from "../../../variables";

const UserProfile = () => {

    const [modalUpdate, setModalUpdate] = useState<boolean>(false)

    const switchVisibility = useCallback(() => {
        setModalUpdate(prev => !prev)
    }, [])

    const {user, loading, error} = useTypedSelector(state => state.profile)
    const {fetchProfile} = profileAction()

    useEffect(() => {
        fetchProfile()
    }, [])

    return(
        <div className={styles.container}>

            <UpBar />

            <div className={styles.profileContent}>
                <div className={styles.profileImage}>
                    <img src={`http://${localVariables.API_URL}${user?.icon}`} alt="User Profile" />
                </div>
                <div className={styles.profileDetails}>
                    <h1>{user.firstName} {user.lastName}</h1>
                    <p>Почта: {user.email}</p>
                    <p>Номер телефона: {user.phoneNumber}</p>
                    
                    <div className={styles[`button-list`]}>
                        <button className={styles.editButton} onClick={switchVisibility}>Редактировать профиль</button>
                        <button className={styles.editButton}>Сменить пароль</button>
                    </div>
                </div>
            </div>

            <ModalUpdateProfile 
                isOpen={modalUpdate}
                switchVisibility={switchVisibility}
            />
        </div>
    )
}

export default UserProfile;
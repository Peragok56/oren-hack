// React
import React, { FC, memo, useCallback, useEffect, useState } from "react";
// Styles
import styles from './Users.module.css'
// Сщьзщтутеы
import UpBar from "../../../components/UpBar/UpBar";
import UserCardMini from "../../../components/UserCardMini/UserCardMini";
import ModalCreateUser from "../../../components/ModalCreateUser/ModalCreateUser";
import axios from "../../../axios/axios";
import { getCookie } from "../../../auth/authMethod";
import ModalEdituser from "../../../components/ModalEdituser/ModalEdituser";

const CompanyRepresentativUsers = () => {

    const [userCreate, setUserCreate] = useState<boolean>(false)
    const [userEdit, setUserEdit] = useState<boolean>(false)
    const [userId, setUserId] = useState<number>()
    const [companyUsers, setCompanyUsers] = useState<any[]>([])

    const switchVisibility = useCallback(() => {
        setUserCreate(prev => !prev)
    }, [])

    const switchVisibilityEdit = useCallback(() => {
        setUserEdit(prev => !prev)
    }, [])

    useEffect(() => {
        axios.get('/users/getAll', {headers: {Authorization: `Bearer ${getCookie('accessToken')}`}})
        .then(res => {
            console.log(res.data);
            setCompanyUsers(res.data)
        })
    }, [])

    const refreshUser = () => {
        axios.get('/users/getAll', {headers: {Authorization: `Bearer ${getCookie('accessToken')}`}})
        .then(res => {
            console.log(res.data);
            setCompanyUsers(res.data)
        })
    }

    const openModalEdit = (id: number) => {
        setUserId(id)
        switchVisibilityEdit()
    }

    return(
        <div className={styles[`container`]}>

            <UpBar />

            <div className={styles[`users-block`]}>


                <div className={styles[`users-block-list`]}>
                <h1 className={styles[`users-block-label`]}>
                    Пользователи

                    <button className={styles[`actionButton`]} onClick={switchVisibility}>
                        Добавить
                    </button>
                </h1>

                    <div className={styles[`block-list`]}>
                        {companyUsers.map((user: any) => 
                            <UserCardMini 
                                user={user}
                                openModalEdit={() => openModalEdit(user.id)}
                            />
                        )}
                    </div>
                </div>
            </div>

            <ModalCreateUser 
                isOpen={userCreate}
                switchVisibility={switchVisibility}
                refreshUsers={refreshUser}
            />

            <ModalEdituser 
                isOpen={userEdit}
                switchVisibility={switchVisibilityEdit}
                userId={userId}
            />
        </div>
    )
}

export default CompanyRepresentativUsers
// React
import React, { FC, memo, useEffect, useState } from "react";
// Styles
import styles from './ModalEdituser.module.css'
import { IModalEdituser } from "./ModalEdituser.type";
import Modal from "../Modal/Modal";
import { useForm } from "react-hook-form";
import axios from "../../axios/axios";
import { getCookie } from "../../auth/authMethod";

interface CreateUser {
    role?: string,
    rolesCompanyId?: number
}

const ModalEdituser: FC<IModalEdituser> = ({
    isOpen,
    switchVisibility,
    userId
}) => {

    const [userInfo, setUserInfo] = useState<any>()
    const [occupations, setOccupations] = useState<any[]>([])

    const { register, handleSubmit, formState: { errors }, reset } = useForm<CreateUser>({
        defaultValues: {
            role: '',
            rolesCompanyId: 0,
        }
    });

    const onSubmit = async (data: CreateUser) => {
        const e: MouseEvent = window.event as MouseEvent;
        e.preventDefault()

        axios.post('/users/addRoleCompany', 
        {
            userId: userId,
            rolesCompanyId: Number(data.rolesCompanyId)
        }, {headers: {Authorization: `Bearer ${getCookie('accessToken')}`}})
        .then(res => {
            axios.post('/users/addHomeRole', 
            {
                userId: userId,
                role: data.role
            })
            .then(res => {
                switchVisibility?.()
            })
        })
        
    };

    useEffect(() => {
        if (userId) {
            axios.get(`/users/${userId}/getOne`, {headers: {Authorization: `Bearer ${getCookie('accessToken')}`}})
            .then(res => {
                setUserInfo(res.data)
                reset(res.data)
            })
        }
    }, [userId])

    useEffect(() => {
        axios.get('/occupation/findAll', {headers: {Authorization: `Bearer ${getCookie('accessToken')}`}})
        .then(res => {
            setOccupations(res.data)
        })
    }, [])

    return(
        <Modal
            isOpen={isOpen}
            switchVisibility={switchVisibility}
        >
            <div className={styles[`container`]}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <h1>Редактирование пользователя</h1>

                    <div className={styles[`input`]}>
                        <p>Роль</p>
                        <select {...register('role')}>
                            <option value={'user'}>Рабочий</option>
                            <option value={'HR-meneger'}>HR-менеджер</option>
                            <option value={'adminPortal'}>Админ портала</option>
                            <option value={'HR-meneger'}>HR-менеджер</option>
                        </select>
                    </div>

                    <div className={styles[`input`]}>
                        <p>Професcия</p>
                        <select {...register('rolesCompanyId')}>
                            {occupations.map((occupation: any) =>
                                <option value={occupation.id}>{occupation.name}</option>
                            )}
                        </select>
                    </div>

                    <input type="submit" value={'Обновить'}/>
                </form>
            </div>
        </Modal>
    )
}

export default memo(ModalEdituser)
// React
import React, { FC, memo, useEffect, useState } from "react";
// Styles
import styles from './ModalCreateUser.module.css'
// Types
import { IModalCreateUser } from "./ModalCreateUser.type";
import Modal from "../Modal/Modal";
import { useFieldArray, useForm } from "react-hook-form";
import axios from "../../axios/axios";
import { getCookie } from "../../auth/authMethod";

interface CreateUser {
    firstName: string,
    lastName: string,
    phoneNumber: string,
    passwordHash: string,
    email: string,
    role: string;
    roleCompany: string,
    bithDate: string
}

const ModalCreateUser: FC<IModalCreateUser> = ({
    isOpen,
    switchVisibility,
    refreshUsers
}) => {

    const [occupations, setOccupations] = useState<any[]>([])

    const { register, handleSubmit, formState: { errors } } = useForm<CreateUser>({
        defaultValues: {
            firstName: '',
            lastName: '',
            phoneNumber: '',
            passwordHash: '',
            email: '',
            role: '',
            roleCompany: '',
            bithDate: ''
        }
    });

    const onSubmit = async (data: CreateUser) => {
        const e: MouseEvent = window.event as MouseEvent;
        e.preventDefault()

        axios.post('/users/create', data, {headers: {Authorization: `Bearer ${getCookie('accessToken')}`}})
        .then(res => {
            console.log(res.data);
            switchVisibility()
            refreshUsers?.()
        })
    };

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
                    <h1>Создание пользователя</h1>

                    <div className={styles[`input`]}>
                        <p>Имя</p>
                        <input {...register('firstName', { required: '*Поле "Имя" обязательно для заполнения' })} />
                    </div>

                    <div className={styles[`input`]}>
                        <p>Фамилия</p>
                        <input {...register('lastName', { required: '*Поле "Фамилия" обязательно для заполнения' })} />
                    </div>

                    <div className={styles[`input`]}>
                        <p>Почта</p>
                        <input {...register('email', { required: '*Поле "Почта" обязательно для заполнения' })} />
                    </div>

                    <div className={styles[`input`]}>
                        <p>Дата рождения</p>
                        <input type="date" {...register('bithDate', { required: '*Поле "Дата рождения" обязательно для заполнения' })} />
                    </div>

                    <div className={styles[`input`]}>
                        <p>Номер телефона</p>
                        <input {...register('phoneNumber', { required: '*Поле "Номер телефона" обязательно для заполнения' })} />
                    </div>

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
                        <select {...register('roleCompany')}>
                            {occupations.map((occupation: any) =>
                                <option value={occupation.id}>{occupation.name}</option>
                            )}
                        </select>
                    </div>

                    <div className={styles[`input`]}>
                        <p>Пароль</p>
                        <input {...register('passwordHash', { required: '*Поле "Пароль" обязательно для заполнения' })} type="password"/>
                    </div>

                    <input type="submit" value={'Создать'}/>
                </form>
            </div>
        </Modal>
    )
}

export default memo(ModalCreateUser)
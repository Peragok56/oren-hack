// React
import React, { FC, memo, useEffect } from "react";
// Styles
import styles from './ModalUpdateProfile.module.css'
import { IModalUpdateProfile } from "./ModalUpdateProfile.type";
import Modal from "../Modal/Modal";
import { useForm } from "react-hook-form";
import axios from "../../axios/axios";
import { getCookie } from "../../auth/authMethod";
import Swal from "sweetalert2";
import { profileAction } from "../../hooks/profileAction";

interface CreateUser {
    firstName: string,
    lastName: string,
    phoneNumber: string,
    email: string
}

const ModalUpdateProfile: FC<IModalUpdateProfile> = ({
    isOpen,
    switchVisibility
}) => {
    const {setNewInfoForProfile} = profileAction()

    const { register, handleSubmit, formState: { errors }, reset } = useForm<CreateUser>({
        defaultValues: {
            firstName: '',
            lastName: '',
            phoneNumber: '',
            email: '',
        }
    });

    const convertBase64 = (file: any) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
    
            fileReader.onload = () => {
                resolve(fileReader.result);
            };
    
            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };

    const onSubmit = async (data: CreateUser) => {
        const e: MouseEvent = window.event as MouseEvent;
        e.preventDefault()

        // @ts-ignore
        const file = document.getElementById('fileId').files[0];
        const base64 = await convertBase64(file);

        axios.patch('/users/update', {...data, icon: base64}, {headers: {Authorization: `Bearer ${getCookie('accessToken')}`}})
        .then(res => {
            axios.get('/users/getInfo', {headers: {Authorization: `Bearer ${getCookie('accessToken')}`}})
            .then(res => {
                setNewInfoForProfile(res.data)
                switchVisibility?.()
            })
            .catch(err => {
                Swal.fire({
                    icon: 'error',
                    title: 'Ой',
                    text: `Произошла ошибка при получение информации о пользователе`,
                })
            })
        })
        .catch(err => {
            Swal.fire({
                icon: 'error',
                title: 'Ой',
                text: `Произошла ошибка при обновление информации о пользователе`,
            })
        })
    };

    useEffect(() => {
        axios.get('/users/getInfo', {headers: {Authorization: `Bearer ${getCookie('accessToken')}`}})
        .then(res => {
            reset(res.data)
        })
        .catch(err => {
            Swal.fire({
                icon: 'error',
                title: 'Ой',
                text: `Произошла ошибка при получение информации о пользователе`,
              })
        })
    }, [])

    return(
        <Modal
            isOpen={isOpen}
            switchVisibility={switchVisibility}
        >
            <div className={styles[`container`]}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <h1>Редактирование информации</h1>

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
                        <p>Номер телефона</p>
                        <input {...register('phoneNumber', { required: '*Поле "Номер телефона" обязательно для заполнения' })} />
                    </div>

                    <div className={styles[`input`]}>
                        <p>Фото</p>
                        <input type="file" id="fileId"/>
                    </div>

                    <input type="submit" value={'Создать'}/>
                </form>
            </div>
        </Modal>
    )
}

export default memo(ModalUpdateProfile)
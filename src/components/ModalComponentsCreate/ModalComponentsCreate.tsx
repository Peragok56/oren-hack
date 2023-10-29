// React
import React, { FC, memo } from "react";
// Styles
import styles from './ModalComponentsCreate.module.css'
import { IModalComponentsCreate } from "./ModalComponentsCreate.type";
import Modal from "../Modal/Modal";
import { useForm } from "react-hook-form";
import { profileAction } from "../../hooks/profileAction";
import axios from "../../axios/axios";
import { getCookie } from "../../auth/authMethod";

interface CreateCompany{
    name: string,
    address: string,
    phoneNumber: string,
    icon?: string
}

const ModalComponentsCreate: FC<IModalComponentsCreate> = ({
    isOpen,
    switchVisibility,
}) => {

    const {setNewInfoForProfile} = profileAction()

    const { register, handleSubmit, formState: { errors } } = useForm<CreateCompany>({
        defaultValues: {
            name: '',
            address: '',
            phoneNumber: '',
            icon: ''
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

    const onSubmit = async (data: CreateCompany) => {
        const e: MouseEvent = window.event as MouseEvent;

        // @ts-ignore
        const file = document.getElementById('fileId').files[0];
        const base64 = await convertBase64(file);

        console.log(base64);
        

        axios.post('/company/create', 
            {...data, icon: base64},
            {headers: {Authorization: `Bearer ${getCookie('accessToken')}`}}
        )
        .then(res => {
            console.log(res.data);
            setNewInfoForProfile(res.data)
            switchVisibility()  
        })
    };

    return(
        <Modal
            isOpen={isOpen}
            switchVisibility={switchVisibility}
        >

            <div className={styles[`container`]}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className={styles[`input`]}>
                        <p>Название</p>
                        <input {...register('name', { required: '*Поле "Название" обязательно для заполнения' })} />
                    </div>
                    <div className={styles[`input`]}>
                        <p>Адрес</p>
                        <input {...register('address', { required: '*Поле "Номер телефона" обязательно для заполнения' })} />
                    </div>
                    <div className={styles[`input`]}>
                        <p>Номер телефона</p>
                        <input {...register('phoneNumber', { required: '*Поле "Номер телефона" обязательно для заполнения' })} />
                    </div>

                    <div className={styles[`input`]}>
                        <p>Номер телефона</p>
                        <input type="file" id="fileId"/>
                    </div>

                    
                    <input type="submit" value={'Сохранить'}/>
                </form>
            </div>

        </Modal>
    )
}

export default memo(ModalComponentsCreate)
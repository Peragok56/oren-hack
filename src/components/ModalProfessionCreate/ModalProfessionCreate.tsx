// React
import React, { FC, memo } from "react";
// Styles
import styles from './ModalProfessionCreate.module.css'
import { IModalProfessionCreate } from "./ModalProfessionCreate.type";
import Modal from "../Modal/Modal";
import { useForm } from "react-hook-form";
import axios from "../../axios/axios";
import { getCookie } from "../../auth/authMethod";

interface ProfessionCreate {
    name?: string,
}

const ModalProfessionCreate: FC<IModalProfessionCreate> = ({
    isOpen,
    switchVisibility,
    refreshOccupation
}) => {

    const { register, handleSubmit, formState: { errors } } = useForm<ProfessionCreate>({
        defaultValues: {
            name: '',
        }
    });

    const onSubmit = (data: ProfessionCreate) => {
        const e: MouseEvent = window.event as MouseEvent;
        e.preventDefault()

        axios.post('/occupation/create', data, {headers: {Authorization: `Bearer ${getCookie('accessToken')}`}})
        .then(res => {
            console.log(res.data);
            switchVisibility?.()
            refreshOccupation?.()
        })
        
    };

    return(
        <Modal
            isOpen={isOpen}
            switchVisibility={switchVisibility}
        >
            <div className={styles[`container`]}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <h1>Добавление професии</h1>

                    <div className={styles[`input`]}>
                        <p>Название</p>
                        <input {...register('name', { required: '*Поле "Имя" обязательно для заполнения' })} />
                    </div>

                    <input type="submit" value={'Создать'}/>
                </form>
            </div>
        </Modal>
    )
}

export default memo(ModalProfessionCreate)
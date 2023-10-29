// React
import React, { FC, memo, useEffect, useState } from "react";
// Styles
import styles from './ModalFileUpload.module.css'
import { IModalFileUpload } from "./ModalFileUpload.type";
import Modal from "../Modal/Modal";
import { useForm } from "react-hook-form";
import axios from "../../axios/axios";
import { getCookie } from "../../auth/authMethod";
import Swal from "sweetalert2";

interface CreateUser {
    name?: string,
    description?: string,
    roleCompanyId?: number
}

const ModalFileUpload: FC<IModalFileUpload> = ({
    isOpen,
    switchVisibility,
    refreshEducation
}) => {
    const [roles, setRoles] = useState<any[]>([])

    const { register, handleSubmit, formState: { errors }, reset } = useForm<CreateUser>({
        defaultValues: {
            name: '',
            description: '',
            roleCompanyId: 0
        }
    });

    const [fileName, setFileName] = useState<string>('')

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

        // @ts-ignore
        const file = document.getElementById('fileId').files[0];
        const base64 = await convertBase64(file);

        console.log(base64);
        
        axios.post('/education/create', 
        {
            name: data.name,
            description: data.description,
            roleCompanyId: Number(data.roleCompanyId),
            documents: [{documentBase64: base64, name: fileName}]
        }, {headers: {Authorization: `Bearer ${getCookie('accessToken')}`}})
        .then(res => {
            switchVisibility?.()
            refreshEducation?.()
        })
        .catch(err => {
            Swal.fire({
                icon: 'error',
                title: 'Ой',
                text: `${err.response.data.message}`,
              })
        })
    };

    useEffect(() => {
        axios.get('/roles-company/findAll', {headers: {Authorization: `Bearer ${getCookie('accessToken')}`}})
        .then(res => {
            setRoles(res.data)
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
        <Modal
            isOpen={isOpen}
            switchVisibility={switchVisibility}
        >
            <div className={styles[`container`]}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <h1>Загрузка файла</h1>

                    <div className={styles[`input`]}>
                        <p>Название</p>
                        <input {...register('name', { required: '*Поле "Название" обязательно для заполнения' })}/>
                    </div>

                    <div className={styles[`input`]}>
                        <p>Описание</p>
                        <input {...register('description', { required: '*Поле "Описание" обязательно для заполнения' })}/>
                    </div>

                    <div className={styles[`input`]}>
                        <p>Роль</p>
                        <select {...register('roleCompanyId')}>
                            {roles.map(role => 
                                <option value={role.id}>{role.nameRole}</option>
                            )}
                        </select>
                    </div>

                    <div className={styles[`input`]}>
                        <p>Название файла</p>
                        <input value={fileName} onChange={e => setFileName(e.target.value)}/>
                    </div>

                    <div className={styles[`input`]}>
                        <p>Файл</p>
                        <input type="file" id="fileId"/>
                    </div>

                    <input type="submit" value={'Отправить'}/>
                </form>
            </div>   
        </Modal>
    )
}

export default memo(ModalFileUpload)
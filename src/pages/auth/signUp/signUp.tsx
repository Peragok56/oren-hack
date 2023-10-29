// React
import React from "react";
// Styles
import styles from './signUp.module.css'
// react-hook-form
import { useForm} from 'react-hook-form'
// react-router-dom
import { Link } from "react-router-dom";
// auth-method
import { signUp } from '../../../auth/authMethod'

export interface SignUpType {
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    phoneNumber: string,
}

const SignUp = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<SignUpType>({
        defaultValues: {
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            phoneNumber: '',
        }
    });

    const onSubmit = (data: SignUpType) => {
        const e: MouseEvent = window.event as MouseEvent;
        console.log(data);
        signUp(e, data);
    };

    return(
        <div className={styles[`container`]}>

            <form onSubmit={handleSubmit(onSubmit)}>

                <h1>Регистрация</h1>

                <div className={styles[`input`]}>
                    <p>Имя</p>
                    <input {...register('firstName', { required: '*Поле "Имя" обязательно для заполнения' })} />
                </div>
                    {errors.firstName && <span className={styles['error']}>{errors.firstName.message}</span>}

                <div className={styles[`input`]}>
                    <p>Фамилия</p>
                    <input {...register('lastName', { required: '*Поле "Фамилия" обязательно для заполнения' })} />
                </div>
                    {errors.lastName && <span className={styles['error']}>{errors.lastName.message}</span>}

                <div className={styles[`input`]}>
                    <p>Почта</p>
                    <input {...register('email', { required: '*Поле "Почта" обязательно для заполнения' })} />
                </div>
                    {errors.email && <span className={styles['error']}>{errors.email.message}</span>}

                <div className={styles[`input`]}>
                    <p>Номер телефона</p>
                    <input {...register('phoneNumber', { required: '*Поле "Номер телефона" обязательно для заполнения' })} />
                </div>
                    {errors.phoneNumber && <span className={styles['error']}>{errors.phoneNumber.message}</span>}

                <div className={styles[`input`]}>
                    <p>Дата рождения</p>
                    <input type="date"  />
                </div>
                    {/* {errors.phoneNumber && <span className={styles['error']}>{errors.bithDate.message}</span>} */}

                <div className={styles[`input`]}>
                    <p>Пароль</p>
                    <input {...register('password', { required: '*Поле "Пароль" обязательно для заполнения' })} type="password"/>
                </div>
                {errors.password && <span className={styles['error']}>{errors.password.message}</span>}

                <input type="submit" value={'Зарегистрироваться'}/>

                <div className={styles[`help-block`]}>
                    <p>Уже есть аккаунт?</p>
                    <Link to={{pathname: '/signIn'}}>Войти</Link>
                </div>

            </form>

        </div>
    )
}

export default SignUp
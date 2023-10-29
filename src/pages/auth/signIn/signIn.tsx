// React
import React from "react";
// Styles
import styles from './signIn.module.css'
// react-hook-form
import { useForm} from 'react-hook-form'
// react-router-dom
import { Link } from "react-router-dom";
// auth-method
import { auth } from "../../../auth/authMethod";

export interface AuthType {
    email: string,
    password: string,
}

const SignIn = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<AuthType>({
        defaultValues: {
            email: '',
            password: '',
        }
    });

    const onSubmit = (data: AuthType) => {
        const e: MouseEvent = window.event as MouseEvent;
        auth(e, data);
    };

    return(
        <div className={styles[`container`]}>

            <form onSubmit={handleSubmit(onSubmit)}>

                <h1>Авторизация</h1>

                <div className={styles[`input`]}>
                    <p>Почта</p>
                    <input {...register('email', { required: '*Поле "Почта" обязательно для заполнения' })} />
                </div>
                    {errors.email && <span className={styles['error']}>{errors.email.message}</span>}

                <div className={styles[`input`]}>
                    <p>Пароль</p>
                    <input {...register('password', { required: '*Поле "Пароль" обязательно для заполнения' })} type="password"/>
                </div>
                {errors.password && <span className={styles['error']}>{errors.password.message}</span>}

                <input type="submit" value={'Войти'}/>

                <div className={styles[`help-block`]}>
                    <p>Еще нет аккаунта?</p>
                    <Link to={{pathname: '/signUp'}}>Зарегистрироваться</Link>
                </div>

            </form>

        </div>
    )
}

export default SignIn
// React
import React, { useEffect, useState } from "react";
// Styles
import styles from './Tests.module.css'
import UpBar from "../../../components/UpBar/UpBar";
import axios from "../../../axios/axios";
import { getCookie } from "../../../auth/authMethod";
import UserTestCard from "../../../components/UserTestCard/UserTestCard";

const UserTests = () => {

    const [tests, setTests] = useState<any[]>([])

    useEffect(() => {
        axios.get('/test/findAll', {headers: {Authorization: `Bearer ${getCookie('accessToken')}`}})
        .then(res => {
            console.log(res.data);
            
            setTests(res.data)
        })
    }, [])

    return(
        <div className={styles[`container`]}>

            <UpBar />

            <div className={styles[`users-block`]}>


                <div className={styles[`users-block-list`]}>
                <h1 className={styles[`users-block-label`]}>
                    Доступные тесты
                </h1>

                    <div className={styles[`block-list`]}>
                        {tests.map((test: any) => 
                            <UserTestCard 
                                test={test}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserTests
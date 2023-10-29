// React
import React, { useEffect, useState } from "react";
// Styles
import styles from './Test.module.css'
import UpBar from "../../../components/UpBar/UpBar";
import { Link } from "react-router-dom";
import axios from "../../../axios/axios";
import { getCookie } from "../../../auth/authMethod";
import TestCard from "../../../components/TestCard/TestCard";

const CompanyRepresentatiTest = () => {

    const [tests, setTests] = useState<any[]>([])

    useEffect(() => {
        axios.get('/test/findAll', {headers: {Authorization: `Bearer ${getCookie('accessToken')}`}})
        .then(res => {
            console.log(res.data);
            setTests(res.data)
        })
    }, [])

    const removeTest = (id: number) => {
        axios.delete(`/test/remove/${id}`, {headers: {Authorization: `Bearer ${getCookie('accessToken')}`}})
        .then(res => {
            axios.get('/test/findAll', {headers: {Authorization: `Bearer ${getCookie('accessToken')}`}})
            .then(res => {
                console.log(res.data);
                setTests(res.data)
            })
        })
    }

    return(
        <div className={styles[`container`]}>

            <UpBar />

            <div className={styles[`users-block`]}>


                <div className={styles[`users-block-list`]}>
                <h1 className={styles[`users-block-label`]}>
                    Текущие тесты

                    <Link to={{pathname: '/company-representativ-test-create'}} className={styles[`actionButton`]}>
                        Добавить
                    </Link>
                </h1>

                    <div className={styles[`block-list`]}>
                        {tests.map((test: any) => 
                            <TestCard 
                                test={test}
                                testRemove={() => removeTest(test.id)}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CompanyRepresentatiTest
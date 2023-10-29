// React
import React, { useEffect, useState } from "react";
// Styles
import styles from './main.module.css'
// Components
import UpBar from "../../../components/UpBar/UpBar";
import AnalyticsCard from "../../../components/AnalyticsCard/AnalyticsCard";
import DayliActivityChart from "../../../components/DayliActivityChart/DayliActivityChart";
import TasthorizontalCard from "../../../components/TasthorizontalCard/TasthorizontalCard";
import axios from "../../../axios/axios";
import { getCookie } from "../../../auth/authMethod";
import Swal from "sweetalert2";


const UserMain = () => {

    const [tests, setTests] = useState<any[]>([])
    const [completeTests, setCompelteTests] = useState<number>(0)

    const data: any = [
        { date: "2023-10-01", activity: 10 },
        { date: "2023-10-02", activity: 15 },
        { date: "2023-10-03", activity: 8 },
        { date: "2023-10-04", activity: 12 },
        { date: "2023-10-05", activity: 20 },
    ];

    useEffect(() => {
        axios.get('/test/findAll', {headers: {Authorization: `Bearer ${getCookie('accessToken')}`}})
        .then(res => {
            console.log(res.data);
            setTests(res.data)

            let count: number = 0

            for (const test of res.data) {
                if (test.testResultUser) {
                    count++
                }
            }

            setCompelteTests(count)

        })
        .catch(err => {
            Swal.fire({
                icon: 'error',
                title: 'Ой',
                text: `Произошла ошибка при получение тестов`,
              })
        })
    }, [])

    return(
        <div className={styles[`container`]}>

            <UpBar />

            <div className={styles[`main-block`]}>
                
                <div className={styles[`left-block`]}>
                    <div className={styles[`analytics-bloks`]}>
                        <AnalyticsCard 
                            label="Всего тестов"
                            value={`${tests.length}`}
                        />

                        <AnalyticsCard 
                            label="Пройденно тестов"
                            value={`${completeTests}`}
                        />

                        <AnalyticsCard 
                            label="Пройденно тестов"
                            value="7"
                        />

                        <AnalyticsCard 
                            label="Пройденно тестов"
                            value="7"
                        />
                    </div>

                    <div className={styles[`ready-test`]}>
                        <h1 className={styles[`ready-test-label`]}>Тесты для выполнения</h1>

                        <div className={styles[`tests-block`]}>
                            {tests.map((test: any) => 
                                <TasthorizontalCard 
                                    test={test}
                                />
                            )}
                        </div>
                    </div>
                </div>

                <div className={styles[`right-block`]}>
                    <DayliActivityChart data={data}/>
                </div>

            </div>

        </div>
    )
}

export default UserMain
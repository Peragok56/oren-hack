// React
import React, { useCallback, useEffect, useState } from "react";
// Styles
import styles from './Main.module.css'
// Components
import UpBar from "../../../components/UpBar/UpBar";
import AnalyticsCard from "../../../components/AnalyticsCard/AnalyticsCard";
import DayliActivityChart from "../../../components/DayliActivityChart/DayliActivityChart";
import TasthorizontalCard from "../../../components/TasthorizontalCard/TasthorizontalCard";
import { useTypedSelector } from "../../../hooks/userTypedSelector";
import { profileAction } from "../../../hooks/profileAction";
import { NavLink } from "react-router-dom";
import ModalComponentsCreate from "../../../components/ModalComponentsCreate/ModalComponentsCreate";
import UserCard from "../../../components/UserCard/UserCard";

const CompanyRepresentativMain = () => {

    const [modalCreate, setModalCreate] = useState<boolean>(false)

    const switchVisibility = useCallback(() => {
        setModalCreate(prev => !prev)
    }, [])

    const data: any = [
        { date: "2023-10-01", activity: 10 },
        { date: "2023-10-02", activity: 15 },
        { date: "2023-10-03", activity: 8 },
        { date: "2023-10-04", activity: 12 },
        { date: "2023-10-05", activity: 20 },
    ];

    const {user, loading, error} = useTypedSelector(state => state.profile)
    const {fetchProfile} = profileAction()

    useEffect(() => {
        fetchProfile()
    }, [])

    

    return(
        <div className={styles[`container`]}>

            <UpBar />


            {
                user.companyId === null ? 
                <div className={styles[`create-company`]}>
                    <h1 className={styles[`create-company-label`]}>У нас пока нет информацим о вашей компании</h1>
                    <button onClick={switchVisibility}>Внести информацию</button>
                </div> 
                : 
                <div className={styles[`main-block`]}>
                
                    <div className={styles[`left-block`]}>
                        <div className={styles[`analytics-bloks`]}>

                            <AnalyticsCard 
                                label="Участников"
                                value="1234"
                            />

                            <AnalyticsCard 
                                label="Прошли сегодня тест"
                                value="257"
                            />

                            <AnalyticsCard 
                                label="Всего тестов"
                                value="189"
                            />


                            <AnalyticsCard 
                                label="Пройденно тестов"
                                value="7"
                            />
                        </div>

                        <div className={styles[`ready-test`]}>
                            <h1 className={styles[`ready-test-label`]}>Участники</h1>

                            <div className={styles[`tests-block`]}>
                                <UserCard />
                                <UserCard />
                                <UserCard />
                                <UserCard />
                                <UserCard />
                                <UserCard />
                                <UserCard />
                                <UserCard />
                                <UserCard />
                            </div>
                        </div>
                    </div>

                    <div className={styles[`right-block`]}>
                        <DayliActivityChart data={data}/>
                    </div>

                </div>
            }

            <ModalComponentsCreate 
                isOpen={modalCreate} 
                switchVisibility={switchVisibility}
            />

        </div>
    )
}

export default CompanyRepresentativMain
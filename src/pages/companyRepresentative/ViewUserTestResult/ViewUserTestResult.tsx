// React
import React, { useEffect, useState } from "react";
// Styles
import styles from './ViewUserTestResult.module.css'
import UpBar from "../../../components/UpBar/UpBar";
import Question from "../../../components/Question/Question";
import { useLocation } from "react-router-dom";
import axios from "../../../axios/axios";
import { getCookie } from "../../../auth/authMethod";

const ViewUserTestResult = () => {

    const [test, setTest] = useState<any>()

    const location = useLocation()

    console.log(location.state);

    useEffect(() => {
        // @ts-ignore
        axios.get(`/test/findUserTestHomeRole/${location.state.testId}/${location.state.userId}`, {headers: {Authorization: `Bearer ${getCookie('accessToken')}`}})
        .then(res => {
            console.log(res.data);
            setTest(res.data?.testResultUser?.[0])
        })
    }, [])

    return(
        <div className={styles.container}>
            <UpBar />
            <div className={styles[`main-container`]}>
                <h2 className={styles.title}>Просмотр теста</h2>
                {test?.questions?.map((question: any, questionIndex: number) => (
                    <div key={questionIndex} className={styles.question}>
                        <h3>Вопрос {questionIndex + 1}:</h3>
                        <p className={styles.questionLabel}>{question.question}</p>
                        <ul className={styles.list}>
                            {question?.answer.map((answer: any, answerIndex: number) => (
                                <li
                                    key={answerIndex}
                                    className={`${styles.listItem} ${answer.select && styles.userSelectedAnswer} ${answer.isCorrect && styles.correctAnswer}`}
                                >
                                    {answer.text}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ViewUserTestResult
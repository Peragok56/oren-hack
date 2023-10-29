// React
import React, { FC, memo } from "react";
// Style
import styles from './TasthorizontalCard.module.css'
import { ITasthorizontalCard } from "./TasthorizontalCard.type";
import { Link } from "react-router-dom";

const TasthorizontalCard:FC<ITasthorizontalCard> = ({
    test
}) => {
    return(
        <div className={styles.container}>
            <div className={styles.textContainer}>
                <div className={styles.title}>{test?.name}</div>
                <div className={styles.description}>Кол-во вопросов: {test?.questions?.length}</div>
            </div>
            <div className={styles.footer}>
                <div>Дата теста: 01.01.2023</div>
                {
                    test?.testResultUser && test.testResultUser?.length != 0 ?
                    <button disabled>
                        Пройти в VR
                    </button>
                    :
                    <Link to={{pathname: '/test-taker', state: {testId: test?.id}}}>Пройти тест</Link>
                }
            </div>
        </div>
    )
}

export default memo(TasthorizontalCard)
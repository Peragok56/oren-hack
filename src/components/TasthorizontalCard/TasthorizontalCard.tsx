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
                <Link to={{pathname: ''}}>Пройти тест</Link>
            </div>
        </div>
    )
}

export default memo(TasthorizontalCard)
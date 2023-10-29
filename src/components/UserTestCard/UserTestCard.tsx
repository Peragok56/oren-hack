// React
import React, { FC, memo } from "react";
// Styles
import styles from './UserTestCard.module.css'
import { IUserTestCard } from "./UserTestCard.type";
import { Link } from "react-router-dom";

const UserTestCard: FC<IUserTestCard> = ({
    test,
}) => {
    return(
        <div className={styles.container}>
            <h2 className={styles.title}>{test?.name}</h2>
            <p className={styles.description}>Вопросов: {test?.questions?.length}</p>
            <div className={styles.footer}>
                {
                    test?.testResultUser?.length != 0 ? 
                    <button className={styles[`actionButton`]} disabled>
                        Пройдено
                    </button>
                    :
                    <Link to={{pathname: '/test-taker', state: {testId: test?.id}}} className={styles.actionButton}>Пройти тест</Link>
                }
            </div>
        </div>
    )
}

export default memo(UserTestCard)
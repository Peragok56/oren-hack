import React, { FC, memo } from "react";
// Styles
import styles from './TestCard.module.css';
import { ITestCard } from "./TestCard.type";
import { Link } from "react-router-dom";

const TestCard: FC<ITestCard> = ({
    test,
    testRemove
}) => {
    return (
        <div className={styles.container}>
            <h2 className={styles.title}>{test.name}</h2>
            <p className={styles.description}>Вопросов: {test?.questions?.length}</p>
            <div className={styles.footer}>
                <div className={styles[`button-list`]}>
                    <button className={styles.actionButton} onClick={testRemove}>Удалить тест</button>
                    <Link to={{pathname: '/test-static', state: {testId: test.id}}} className={styles.actionButton}>Статистика</Link>
                </div>
            </div>
        </div>
    );
}

export default memo(TestCard);
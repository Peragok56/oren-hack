import React, { FC, memo } from "react";
// Styles
import styles from './TestCard.module.css';
import { ITestCard } from "./TestCard.type";

const TestCard: FC<ITestCard> = ({
    test,
    testRemove
}) => {
    return (
        <div className={styles.container}>
            <h2 className={styles.title}>{test.name}</h2>
            <p className={styles.description}>Вопросов: {test?.questions?.length}</p>
            <div className={styles.footer}>
                <button className={styles.actionButton} onClick={testRemove}>Удалить тест</button>
            </div>
        </div>
    );
}

export default memo(TestCard);
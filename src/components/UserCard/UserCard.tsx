// React
import React, { FC, memo } from "react";
// Styles
import styles from './UserCard.module.css'

const UserCard: FC = () => {
    return(
        <div className={styles.container}>
            <div className={styles.avatar}>
                <img src="./assets/main/main-people.png" alt="User Avatar" />
            </div>
            <div className={styles.userInfo}>
                <h2 className={styles.userName}>Иван Иванов</h2>
                <p className={styles.userEmail}>ivan@example.com</p>
                <p className={styles.userEmail}>Программист</p>
                <button className={styles.actionButton}>Подробнее</button>
            </div>
        </div>
    )
}

export default memo(UserCard)
// React
import React, { FC, memo } from "react";
// Styles
import styles from './UserCard.module.css'
import { IUserCard } from "./UserCard.type";

const UserCard: FC<IUserCard> = ({
    user
}) => {
    return(
        <div className={styles.container}>
            <div className={styles.avatar}>
                <img src="./assets/main/main-people.png" alt="User Avatar" />
            </div>
            <div className={styles.userInfo}>
                <h2 className={styles.userName}>{user?.firstName} {user?.lastName}</h2>
                <p className={styles.userEmail}>{user?.email}</p>
                <p className={styles.userEmail}>{user?.roleCompany}</p>
            </div>
        </div>
    )
}

export default memo(UserCard)
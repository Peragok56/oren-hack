// React
import React, { FC, memo } from "react";
// Styles
import styles from './UserCardMini.module.css'
// Types
import { IUserCardMini } from "./UserCardMini.type";
// Icons
import { AiOutlineInfo } from 'react-icons/ai'
import { IoIosRemove } from 'react-icons/io'

const UserCardMini: FC<IUserCardMini> = ({
    user,
    openModalEdit,
    removeUser
}) => {
    return(
        <div className={styles.container}>
            <div className={styles.avatar}>
                <img src="./assets/main/main-people.png" alt="User Avatar" />
            </div>
            <div className={styles.userInfo}>
                <h2 className={styles.userName}>{user?.firstName} {user.lastName}</h2>
                <p className={styles.userEmail}>{user?.email}</p>
                <p className={styles.userEmail}>{user?.roleCompany}</p>
                
                <div className={styles[`button-list`]}>
                    <button className={styles.actionButton} onClick={openModalEdit}>
                        <AiOutlineInfo/>
                    </button>

                    <button className={styles.actionButton} onClick={removeUser}>
                        <IoIosRemove />
                    </button>
                </div>

            </div>
        </div>
    )
}

export default memo(UserCardMini)
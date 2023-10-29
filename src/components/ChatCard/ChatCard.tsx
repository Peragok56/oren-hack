// React
import React, { FC, memo } from "react";
// Styles
import styles from './ChatCard.module.css';
import { IChatCard } from "./ChatCard.type";

const ChatCard: FC<IChatCard> = ({ user, message, createChat }) => {
    // const messageDate = new Date(timestamp);
    // const hours = messageDate.getHours().toString().padStart(2, '0');
    // const minutes = messageDate.getMinutes().toString().padStart(2, '0');
    // const formattedTime = `${hours}:${minutes}`;

    return (
        <div className={styles.container} onClick={createChat}>
            <div className={styles.avatar}>
                <img src={'./logo512.png'} alt={`avatar`} />
            </div>
            <div className={styles.messageContent}>
                <div className={styles.messageHeader}>
                    <span className={styles.userName}>{user?.firstName} </span>
                    <span className={styles.timestamp}>{}</span>
                </div>
                
                {
                    !message ? 
                    null
                    :
                    <p className={styles.messageText}>{message}</p>
                }

            </div>
        </div>
    );
}

export default memo(ChatCard);
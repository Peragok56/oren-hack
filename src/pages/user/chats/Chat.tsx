// React
import React, { useEffect, useState } from "react";
// Styles
import styles from './Chat.module.css'
import ChatCard from "../../../components/ChatCard/ChatCard";
import axios from "../../../axios/axios";
import { getCookie } from "../../../auth/authMethod";
import { io } from "socket.io-client";
import { localVariables } from '../../../variables'

const Chat = () => {
    const [users, setUsers] = useState<any[]>([])
    const [userInfo, setUserInfo] = useState<any>()
    const [chat, setChat] = useState<any[]>([])

    useEffect(() => {
        axios.get('/users/getAll', {headers: {Authorization: `Bearer ${getCookie('accessToken')}`}})
        .then(res => {
            console.log(res.data);
            setUsers(res.data)
        })

        let socket = io(`http://${localVariables.API_URL}`, {extraHeaders: {Authorization: `Bearer ${getCookie('accessToken')}`}})
            socket.on('client_connected', () => {
                console.log('Client connected to MessageList socket');
            })

            socket.on('client_disconnected', () => {
                console.log('Client disconnected to MessageList socket');
            })

            socket.on('return_self_chat', (chat: any) => {
                console.log(chat);
                
                setChat(chat)
            })

            socket.emit('get_self_chat')
    }, [])

    return(
        <div className={styles[`container`]}>
            <div className={styles[`left-block`]}>
                <input className={styles[`searchInput`]}/>

                <div className={styles[`user-list`]}>
                    {users.map((user: any) => 
                        <ChatCard 
                            user={user}
                        />
                    )}
                </div>
            </div>
        </div>
    )
}

export default Chat
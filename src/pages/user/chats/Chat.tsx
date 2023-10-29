// React
import React, { useEffect, useRef, useState } from "react";
// Styles
import styles from './Chat.module.css'
import ChatCard from "../../../components/ChatCard/ChatCard";
import axios from "../../../axios/axios";
import { getCookie } from "../../../auth/authMethod";
import { io } from "socket.io-client";
import { localVariables } from '../../../variables'
import { BsSend } from 'react-icons/bs'
import { Socket } from "socket.io-client";
import UpBar from "../../../components/UpBar/UpBar";

const Chat = () => {
    const [users, setUsers] = useState<any[]>([])
    const [userInfo, setUserInfo] = useState<any>({})
    const [chat, setChat] = useState<any[]>([])

    const [msgText, setMsgText] = useState<string>('')

    const [chatId, setChatId] = useState<any>()
    const [chatMessages, setChatMessages] = useState<any[]>([])

    const socketRef = useRef<Socket>();

    useEffect(() => {
        axios.get('/users/getAll', {headers: {Authorization: `Bearer ${getCookie('accessToken')}`}})
        .then(res => {
            setUsers(res.data)
        })

        if (!socketRef.current) {
            socketRef.current = io(`http://${localVariables.API_URL}`, {
                extraHeaders: { Authorization: `Bearer ${getCookie('accessToken')}` }
            });

            socketRef.current.on('client_connected', () => {
                console.log('Client connected to MessageList socket');
            });

            socketRef.current.on('client_disconnected', () => {
                console.log('Client disconnected to MessageList socket');
            });

            socketRef.current.on('return_self_chat', (chat: any) => {
                setChat(chat);
            });

            socketRef.current.on('received_message', (msg: any) => {
                setChatMessages(prevMessages => [...prevMessages, msg]);
            });

            socketRef.current.on('success_send', (msg: any) => {
                setChatMessages(prevMessages => {
                    const updatedMessages = [...prevMessages];
                    const index = updatedMessages.findIndex(message => message.id === msg.id);
                    if (index !== -1) {
                        updatedMessages[index].success = true;
                    }
                    return updatedMessages;
                });
            });
        }

        socketRef.current.emit('get_self_chat');

        return () => {
            if (socketRef.current) {
                socketRef.current.disconnect();
            }
        };

    }, [chatId, chatMessages])

    const createChat = (memberId: number) => {
        axios.post(`/chat/create`, 
        {
            memberId: memberId,
            senderId: userInfo.id,
        }, {headers: {Authorization: `Bearer ${getCookie('accessToken')}`}})
        .then(res => {
            console.log(res.data);
        })

    }

    const getInfoChat = (id: number) => {
        axios.get(`/chats/${id}/messages/getHistory`, {headers: {Authorization: `Bearer ${getCookie('accessToken')}`}})
        .then(res => {
            console.log(res.data);
            setChatId(id)
            setChatMessages(res.data)
        })
    }

    const senMsg = () => {

        if (msgText.length < 1) {
            return;
        }

        let socket = io(`http://${localVariables.API_URL}`, {
            extraHeaders: { Authorization: `Bearer ${getCookie('accessToken')}` }
        });

        socket.emit('send_message', {
            'chatId': chatId,
            'indexInChat': chatMessages.length,
            'createdAt': new Date(),
            'text': msgText,
        });

        const newMessage = {
            'chatId': chatId,
            'text': msgText,
            'createdAt': new Date().toString(),
            'success': false,
            'senderId': userInfo.id // Подставьте ваш ID пользователя
        };

        socket.on('return_self_chat', (chat: any) => {
            setChat(chat);
        });

        socket.emit('get_self_chat');

        setChatMessages(prevMessages => [...prevMessages, newMessage]);
        setMsgText('');
    };

    return(
        <div className={styles[`container`]}>

            <UpBar/>
 
            <div className={styles[`main-container`]}>
            <div className={styles[`left-block`]}>
                <input className={styles[`searchInput`]}/>

                <div className={styles[`user-list`]}>
                    {chat.map((chat: any) => 
                        userInfo.id === chat.sender.id ? 
                        <ChatCard 
                            user={chat.member}
                            createChat={() => getInfoChat(chat?.id)}
                        />
                        :
                        <ChatCard 
                            user={chat.sender}
                            createChat={() => getInfoChat(chat?.id)}
                            message={chat.lastMessage?.text}
                        />
                    )}

                    <div className={styles.line}></div>

                    {users.map((user: any) => 
                        <ChatCard 
                            user={user}
                            createChat={() => createChat(user?.id)}
                        />
                    )}
                </div>
            </div>

            {
                    chatId ? 
                    <div className={styles[`right-block`]}>
                        <div className={styles[`messages`]}>
                        {chatMessages.map((message: any) => 
                            message.senderId === userInfo.id ?
                            <div className={styles[`selfMessage`]}>
                                <p key={message.id}>{message.text}</p>
                            </div> :
                            <div className={styles[`notSelfMessage`]}>
                                <p key={message.id}>{message.text}</p>
                            </div>
                        )}

                        </div>

                        <div className={styles[`chat-zone`]}>
                            <input placeholder="Введите сообщение" value={msgText} onChange={e => setMsgText(e.target.value)}/>
                            <button onClick={senMsg}>
                                <BsSend />
                            </button>
                        </div>
                    </div>
                    :
                    null
            }
            </div>
        </div>
    )
}

export default Chat
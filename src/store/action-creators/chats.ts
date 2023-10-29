import { ChatsAction, ChatsActionType } from "../types/сhats"
import { Dispatch } from "redux"
import axios from "../../axios/axios"

export const fetchChats = () => {
    return async (dispatch: Dispatch<ChatsAction>) => {
        try{
            dispatch({type: ChatsActionType.FETCH_CHATS})
            // axios.get('/chat/getSelf', {headers: {Authorization: `Bearer ${res.accessToken}`}})
            // .then(res => {
            //     dispatch({type: ChatsActionType.FETCH_CHATS_SUCCESS, payload: res.data})
            // })
        }  catch {
            dispatch({type: ChatsActionType.FETCH_CHATS_ERROR, payload: 'Ошибка загрузки чатов'})
        }
    }
}

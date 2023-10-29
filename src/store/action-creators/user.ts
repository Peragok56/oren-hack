import { UserAction, UserActionType } from "../types/users"
import { Dispatch } from "redux"
import axios from "../../axios/axios"
import { ChatsAction, ChatsActionType } from "../types/сhats"
import { io } from "socket.io-client"
import { localVariables } from '../../variables'

export const fetchUsers = () => {
    return async (dispatch: Dispatch<UserAction>) => {
        try{
            dispatch({type: UserActionType.FETCH_USERS})
            // axios.get('/users/getAll', {headers: {Authorization: `Bearer ${res.accessToken}`}})
            // .then(({data}) => {
            //     console.log(data);
            //     dispatch({type: UserActionType.FETCH_USERS_SUCCESS, payload: data})
            // })
        }  catch {
            dispatch({type: UserActionType.FETCH_USERS_ERROR, payload: 'Ошибка загрузки пользователей'})
        }
    }
}

export const skipUser = (id: number) => {
    return async (dispatch: Dispatch<UserAction>) => {
        try{
            dispatch({type: UserActionType.FETCH_USER_SKIP, payload: id})
        } catch {
            dispatch({type: UserActionType.FETCH_USERS_ERROR, payload: 'Ошибка загрузки пользователей'})
        }   
    }
}

export const getOneUser = (id: number) => {
    return async (dispatch: Dispatch<UserAction>) => {
        try{
            dispatch({type: UserActionType.FETCh_USER_GET_ONE, payload: id})
        } catch {
            dispatch({type: UserActionType.FETCH_USERS_ERROR, payload: 'Ошибка при получение информации о пользоателе'})
        }
    }
}

export const getNewUserlist = (data: any) => {
    return async (dispatch: Dispatch<UserAction>) => {
        try{
            dispatch({type: UserActionType.FETCH_USERS})
            dispatch({type: UserActionType.FETCH_USERS_SUCCESS, payload: data})
        } catch {
            dispatch({type: UserActionType.FETCH_USERS_ERROR, payload: 'Ошибка в получение нового списка пользователей'})
        }
    }
}
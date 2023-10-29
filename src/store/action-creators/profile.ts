import { ProfileAction, ProfileActionType } from '../types/profile'
import { Dispatch } from 'redux'
import axios from '../../axios/axios'
import { getCookie } from '../../auth/authMethod'

export const fetchProfile = () => {
    return async (dispatch: Dispatch<ProfileAction>) => {
        try {
            dispatch({type: ProfileActionType.FETCH_PROFILE})
            axios.get('/users/getInfo', {headers: {Authorization: `Bearer ${getCookie('accessToken')}`}})
            .then(({data}) => {
                dispatch({type: ProfileActionType.FETCH_PROFILE_SUCCESS, payload: data})
            })
        } catch {
            dispatch({type: ProfileActionType.FETCH_PROFILE_ERROR, payload: 'Ошибка при загрузке профиля'})
        }
    }
}

export const setNewInfoForProfile = (data: any) => {
    return async (dispatch: Dispatch<ProfileAction>) => {
        try{
            dispatch({type: ProfileActionType.FETCH_PROFILE})
            dispatch({type: ProfileActionType.FETCH_PROFILE_SUCCESS, payload: data})
        } catch {
            dispatch({type: ProfileActionType.FETCH_PROFILE_ERROR, payload: 'Ошибка при изменение данных пользователя'})
        }
    }
}
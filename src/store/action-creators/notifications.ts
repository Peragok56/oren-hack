import { NotificationAction, NotificationActionType } from '../types/notifications'
import { Dispatch } from 'redux'
import axios from '../../axios/axios'

export const fetchNotifications = () => {
    return async (dispatch: Dispatch<NotificationAction>) => {
        try{
            dispatch({type: NotificationActionType.FETCH_NOTIFICATIONS})
            // axios.get('/notification/getSelf', {headers: {Authorization: `Bearer ${res.accessToken}`}})
            // .then(({data}) => {
            //     dispatch({type: NotificationActionType.FETCH_NOTIFICATIONS_SUCCESS, payload: data})
            // })
        } catch {
            dispatch({type: NotificationActionType.FETCH_NOTIFICATIONS_ERROR, payload: 'Ошибка при загрузке уведомлений'})
        }   
    }
}
import { NotificationState, NotificationAction, NotificationActionType } from "../types/notifications"

const initialState: NotificationState = {
    notifications: [],
    loading: false,
    error: null
}

export const notificationsReducer = (state = initialState, action: NotificationAction): NotificationState => {
    switch(action.type){
        case NotificationActionType.FETCH_NOTIFICATIONS:
            return {loading: false, error: null, notifications: []}
        case NotificationActionType.FETCH_NOTIFICATIONS_ERROR:
            return {loading: false, error: action.payload, notifications: []}
        case NotificationActionType.FETCH_NOTIFICATIONS_SUCCESS:
            return {loading: false, error: null, notifications: action.payload.reverse()}
        default: 
            return state
    }
}
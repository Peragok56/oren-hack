export interface NotificationState{
    notifications: any[],
    loading: boolean,
    error: string | null
}

export enum NotificationActionType{
    FETCH_NOTIFICATIONS = 'FETCH_NOTIFFICATIONS',
    FETCH_NOTIFICATIONS_SUCCESS = 'FETCH_NOTIFICATIONS_SUCCESS',
    FETCH_NOTIFICATIONS_ERROR = 'FETCH_NOTIFICATIONS_ERROR',
}

interface FetchNotificationsAction{
    type: NotificationActionType.FETCH_NOTIFICATIONS
}

interface FetchNotificationsSuccessAction{
    type: NotificationActionType.FETCH_NOTIFICATIONS_SUCCESS,
    payload: any[]
}

interface FetchNotificationsErrorsAction{
    type: NotificationActionType.FETCH_NOTIFICATIONS_ERROR
    payload: string
}

export type NotificationAction = 
FetchNotificationsAction 
| FetchNotificationsSuccessAction 
| FetchNotificationsErrorsAction 
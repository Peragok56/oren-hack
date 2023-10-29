export interface UserLikeState{
    users: any[],
    loading: boolean,
    error: null | string
}

export enum UserLikeActionType {
    FETCH_LIKE_USERS = 'FETCH_LIKE_USERS',
    FETCH_LIKE_USERS_SUCCESS = 'FETCH_LIKE_USERS_SUCCESS',
    FETCH_LIKE_USERS_ERROR = 'FETCH_LIKE_USERS_ERROR',
}

interface FetchLikeUsersAction{
    type: UserLikeActionType.FETCH_LIKE_USERS
}

interface FetchLikeUsersSuccessAction{
    type: UserLikeActionType.FETCH_LIKE_USERS_SUCCESS,
    payload: any[]
}

interface FetchLikeUsersErrorsAction{
    type: UserLikeActionType.FETCH_LIKE_USERS_ERROR
    payload: string
}

export type UserLikeAction = 
FetchLikeUsersAction
| FetchLikeUsersSuccessAction 
| FetchLikeUsersErrorsAction

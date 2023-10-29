import { UserLikeState, UserLikeAction, UserLikeActionType } from "../types/usersLike"

const initialState: UserLikeState = {
    users: [],
    loading: false,
    error: null
}


export const userLikeReducer = (state = initialState, action: UserLikeAction): UserLikeState => {
    switch (action.type){
        case UserLikeActionType.FETCH_LIKE_USERS:
            return {loading: true, error: null, users: []}
        case UserLikeActionType.FETCH_LIKE_USERS_SUCCESS:
                return {loading: false, error: null, users: action.payload}
        case UserLikeActionType.FETCH_LIKE_USERS_ERROR:
            return {loading: false, error: action.payload, users: []}
        default: 
            return state
    }
}
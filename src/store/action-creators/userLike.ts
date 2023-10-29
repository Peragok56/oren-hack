import { Dispatch } from "react"
import axios from "../../axios/axios"
import { UserLikeAction, UserLikeActionType } from "../types/usersLike"


export const fetchLikeUsers = () => {
    return async (dispatch: Dispatch<UserLikeAction>) => {
        try{
            dispatch({type: UserLikeActionType.FETCH_LIKE_USERS})
                // axios.get('/userFilter/likes', {headers: {Authorization: `Bearer ${res.accessToken}`}})
                // .then(({data}) => {
                //     console.log(data);
                //     dispatch({type: UserLikeActionType.FETCH_LIKE_USERS_SUCCESS, payload: data})
                // })
        }  catch {
            dispatch({type: UserLikeActionType.FETCH_LIKE_USERS_ERROR, payload: 'Ошибка загрузки пользователей'})
        }
    }
}
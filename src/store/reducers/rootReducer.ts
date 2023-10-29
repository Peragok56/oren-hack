import {combineReducers} from 'redux'
import { notificationsReducer } from './notificationReducer'
import { ProfileReducer } from './profileReducer'
import { userLikeReducer } from './userLikeReducer'
import { userReducer } from './userReducer'
import { chatReducer } from './сhatsReducer'

export const rootReducer = combineReducers({
    user: userReducer,
    userLike: userLikeReducer,
    notifications: notificationsReducer,
    profile: ProfileReducer,
    chats: chatReducer,
})

export type RootState = ReturnType<typeof rootReducer>
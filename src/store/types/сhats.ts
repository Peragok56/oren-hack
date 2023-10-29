import { ChatType } from "../../types/chat.type"

export interface ChatsState{
    chats: ChatType[],
    loading: boolean,
    error: null | string
}

export enum ChatsActionType {
    FETCH_CHATS = 'FETCH_CHATS',
    FETCH_CHATS_SUCCESS = 'FETCH_CHATS_SUCCESS',
    FETCH_CHATS_ERROR = 'FETCH_CHATS_ERROR',
    FETCH_CHATS_EDIT_LASTMESSAGE = 'FETCH_CHATS_EDIT_LASTMESSAGE',
    FETCH_CHATS_ADD_CHAT = 'FETCH_CHATS_ADD_CHAT'
}

interface FetchChatsAction{
    type: ChatsActionType.FETCH_CHATS
}

interface FetchChatsSuccessAction{
    type: ChatsActionType.FETCH_CHATS_SUCCESS,
    payload: any[]
}

interface FetchChatsEditLastMessageAction{
    type: ChatsActionType.FETCH_CHATS_EDIT_LASTMESSAGE,
    payload: any[]
}

interface FetchChatsErrorsAction{
    type: ChatsActionType.FETCH_CHATS_ERROR
    payload: string
}

interface FetchChatsAddChatAction{
    type: ChatsActionType.FETCH_CHATS_ADD_CHAT
    payload: any
}

export type ChatsAction = 
FetchChatsAction 
| FetchChatsSuccessAction 
| FetchChatsErrorsAction 
| FetchChatsEditLastMessageAction
| FetchChatsAddChatAction
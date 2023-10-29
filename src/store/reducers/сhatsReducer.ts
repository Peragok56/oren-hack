import { ChatsAction, ChatsActionType, ChatsState } from "../types/сhats"

const initialState: ChatsState = {
    chats: [],
    loading: false,
    error: null
}

export const chatReducer = (state = initialState, action: ChatsAction): ChatsState => {
    switch (action.type){
        case ChatsActionType.FETCH_CHATS:
            return {loading: true, error: null, chats: []}
        case ChatsActionType.FETCH_CHATS_SUCCESS:
            return {loading: false, error: null, chats: action.payload}
        case ChatsActionType.FETCH_CHATS_ADD_CHAT:
            return {loading: false, error: null, chats: [...state.chats, action.payload] }
        case ChatsActionType.FETCH_CHATS_ERROR:
            return {loading: false, error: action.payload, chats: []}
        default: 
            return state
    }
}
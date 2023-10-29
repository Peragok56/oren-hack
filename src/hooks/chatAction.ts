import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as ChatActionCreators from '../../src/store/action-creators/chats'

export const chatAction = () => {
    const dispatch = useDispatch()
    return bindActionCreators(ChatActionCreators, dispatch)
}
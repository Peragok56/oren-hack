import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as UserActionCreators from '../../../../pat project/loveProject/src/store/action-creators/user'

export const userActions = () => {
    const dispatch = useDispatch()
    return bindActionCreators(UserActionCreators, dispatch)
}
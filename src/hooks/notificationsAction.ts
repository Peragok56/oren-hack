import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as NotificationActionCreators from '../../src/store/action-creators/notifications'

export const notificationAction = () => {
    const dispatch = useDispatch()
    return bindActionCreators( NotificationActionCreators,dispatch)
}
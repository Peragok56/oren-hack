import { useSelector, TypedUseSelectorHook } from 'react-redux'
import { RootState } from '../../../../pat project/loveProject/src/store/reducers/rootReducer'

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector
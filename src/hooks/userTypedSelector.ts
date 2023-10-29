import { useSelector, TypedUseSelectorHook } from 'react-redux'
import { RootState } from '../../src/store/reducers/rootReducer'

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector
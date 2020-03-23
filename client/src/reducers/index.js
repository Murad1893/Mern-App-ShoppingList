import {combineReducers} from 'redux' //meeting place for all reducers
import itemReducer from './itemReducer'
import errReducer from './errReducer'
import authReducer from './authReducer'

export default combineReducers({
  item: itemReducer,
  error: errReducer,
  auth: authReducer
})


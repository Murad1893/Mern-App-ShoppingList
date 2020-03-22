import {combineReducers} from 'redux' //meeting place for all reducers
import itemReducer from './itemReducer'

export default combineReducers({
  item: itemReducer
})


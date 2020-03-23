import {
  USER_LOADING,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL
} from '../actions/types'

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  isLoading: false,
  user: null
}

export default function (state = initialState, action) {
  switch (action.type) {
    case USER_LOADING:
      return {
        ...state,
        isLoading: true
      }
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        user: action.payload
      }
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      localStorage.setItem('token', action.payload.token) //token will now be sent as the payload
      return {
        ...state,
        ...action.payload, //now we will bring in the entire payload, user + token
        isAuthenticated: true,
        isLoading: false
      }

    case AUTH_ERROR:
    case LOGOUT_SUCCESS:
    case LOGIN_FAIL:
    case REGISTER_FAIL:
      localStorage.removeItem('token') //we are also removing any token that is in the local storage
      return {
        ...state,
        token: null,
        user: null,
        isAuthenticated: false,
        isLoading: false
      }

    default:
      return state
  }
}
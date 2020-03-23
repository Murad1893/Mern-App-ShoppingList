import axios from 'axios'
import { USER_LOADED, USER_LOADING, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT_SUCCESS, REGISTER_SUCCESS, REGISTER_FAIL } from './types'
import { returnErrors } from './errorAction'

// check token and load user
export const loadUser = () => (dispatch, getState) => {
  //User loading
  dispatch({ type: USER_LOADING })

  axios.get('/api/auth/user', tokenConfig(getState))
    .then(res => {
      dispatch({
        type: USER_LOADED,
        payload: res.data
      })
    })
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status))
      dispatch({
        type: AUTH_ERROR //now this will call the AUTH_ERROR
      })
    })
}


//register user
export const register = ({ name, email, password }) => dispatch => {
  //headers
  const config = {
    headers: {
      'Content-Type': 'application/json' //because we are sending json
    }
  }

  //request body
  const body = JSON.stringify({ name, email, password }) //bcz we are taking in a javascript object and converting it to JSON

  //config is the header attached
  axios.post('/api/users', body, config)
    .then(res => {
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data //the end point targetted here returns the user data and the token. So this will be sent to the reducer
      })
    })
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL')) //also adding an id here because we will use it to display the error in registerModal.js
      dispatch({
        type: REGISTER_FAIL
      })
    })
}

export const login = ({ email, password }) => dispatch => {
  //headers
  const config = {
    headers: {
      'Content-Type': 'application/json' //because we are sending json
    }
  }

  //request body
  const body = JSON.stringify({ email, password }) //bcz we are taking in a javascript object and converting it to JSON

  //config is the header attached
  axios.post('/api/auth', body, config)
    .then(res => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data //the end point targetted here returns the user data and the token. So this will be sent to the reducer
      })
    })
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL')) //also adding an id here because we will use it to display the error in registerModal.js
      dispatch({
        type: LOGIN_FAIL
      })
    })
}

export const logout = () => dispatch => {
  dispatch({
    type: LOGOUT_SUCCESS
  })
}

//setup config/headers and token
export const tokenConfig = (getState) => {
  //get token from local storage 
  const token = getState().auth.token; //because token is in the auth reducer

  //Headers
  const config = {
    headers: {
      'Content-Type': 'application/json' //because we are sending json
    }
  }

  // if token, then add to headers
  if (token) {
    config.headers['x-auth-token'] = token //hence we pass the token received from jwt to header and then make a get request
  }

  return config
} 

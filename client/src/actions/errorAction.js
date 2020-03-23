import { GET_ERRORS, CLEAR_ERRORS } from './types'

//Return errors
//id is optional here: we may or may not give id to our error
export const returnErrors = (msg, status, id = null) => {
  return {
    type: GET_ERRORS,
    payload: { msg, status, id }
  }
}

//Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  }
}
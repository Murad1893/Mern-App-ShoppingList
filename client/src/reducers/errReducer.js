import { GET_ERRORS, CLEAR_ERRORS } from '../actions/types'

const initialState = {
  msg: {}, //json object from the server
  status: null, //json status from server
  id: null //to grab a certain error and do something with it in the component
}

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ERRORS:
      return {
        msg: action.payload.msg,
        status: action.payload.status,
        id: action.payload.id
      }

    case CLEAR_ERRORS:
      return {
        msg: {}, //because we don't want old errors to be displayed
        status: null,
        id: null
      }

    default:
      return state
  }
}
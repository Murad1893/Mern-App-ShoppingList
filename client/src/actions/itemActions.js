//this is where we will make the requests to our backend
import { GET_ITEMS, ADD_ITEMS, DELETE_ITEMS, ITEMS_LOADING } from '../actions/types'
import axios from 'axios'
import { tokenConfig } from './authAction'
import { returnErrors } from './errorAction'

export const getItems = () => {
  return function (dispatch) {
    dispatch(setItemsLoading())
    axios.get('/api/items/')
      .then(res => dispatch({
        type: GET_ITEMS,
        payload: res.data
      }))
      .catch(err => dispatch(returnErrors(err.response.data, err.response.status)))
  }
}

export const deleteItems = id => {
  return function (dispatch, getState) {
    axios.delete(`/api/items/${id}`, tokenConfig(getState)).then(res => dispatch({
      type: DELETE_ITEMS,
      payload: id
    }))
      .catch(err => dispatch(returnErrors(err.response.data, err.response.status)))
  }
}

export const addItem = item => {
  return function (dispatch, getState) {
    axios.post('/api/items/', item, tokenConfig(getState))
      .then(res => dispatch({
        type: ADD_ITEMS,
        payload: res.data
      }))
      .catch(err => dispatch(returnErrors(err.response.data, err.response.status)))
  }
}

export const setItemsLoading = () => {
  return {
    type: ITEMS_LOADING
  }
}
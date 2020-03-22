//this is where we will make the requests to our backend
import {GET_ITEMS, ADD_ITEMS, DELETE_ITEMS, ITEMS_LOADING} from '../actions/types'
import axios from 'axios'

export const getItems = () => {
  return function(dispatch){
    dispatch(setItemsLoading())
    axios.get('http://localhost:3000/api/items/')
    .then(res=>dispatch({
      type: GET_ITEMS,
      payload: res.data
    }))
  }
}

export const deleteItems = id => {
  
    
  
  return function(dispatch){
    axios.delete(`http://localhost:3000/api/items/${id}`).then(res=>dispatch({
      type: DELETE_ITEMS,
      payload: id
    }))
  }
}

export const addItem = item => {
  return function(dispatch){
    axios.post('http://localhost:3000/api/items/', item)
    .then(res=>dispatch({
      type: ADD_ITEMS,
      payload: res.data
    }))
  }
}

export const setItemsLoading = () => {
  return {
    type: ITEMS_LOADING
  }
}
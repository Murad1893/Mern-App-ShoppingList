import {GET_ITEMS, ADD_ITEMS, DELETE_ITEMS, ITEMS_LOADING} from '../actions/types'

const initialState = {
  items: [], //empty because we will fetch from the database
  loading: false //data fetching takes couple of milliseconds hence we will set it back to false once the data loads
}

export default function(state=initialState, action){
  switch(action.type){
    case GET_ITEMS:
      return{
        //just returning the items
        ...state,
        items: action.payload,
        loading: false //once we get the items  
      }

    case DELETE_ITEMS:
      return{
        ...state,
        //we can check using the action.payload and in this case the action.payload is the id of the item
        items: state.items.filter(item=>item._id!==action.payload) //items will have an _id field not an id so we change over here
      }

    case ADD_ITEMS:
      return{
        ...state,
        items: [action.payload, ...state.items]
      }

    case ITEMS_LOADING:
      return{
        ...state,
        loading: true
      }

    default:
      return state
  }    
}
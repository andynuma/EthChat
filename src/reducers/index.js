import { combineReducers} from "redux"
import * as actionTypes from "../actions/types";

const initialUserState = {
  currentUser: null,
  isLoading:true
}

const user_reducer = (state = initialUserState,action) =>  {
  switch(action.type){
    case actionTypes.SET_USER:
      return {
        currentUser: action.payload.currentUser,
        isloading: false
      }
    case actionTypes.CLEAR_USER:
      return{
        ...state,
        isLoading: false
      }
    default:
      return state
  }
}

const initialChannleState = {
  currentChannel : null
}

const channel_reducer = (state = initialChannleState,action) => {
  switch(action.type){
    case actionTypes.SET_CUREENT_CHANNEL:
      return{
        // 現在までのchannel + 今のチャンネル
        ...state,
        currentChannel: action.payload.currentChannel
      }
    default:
      return state;
  }
}

const initialAccount = {
  currentAccount: null
}

const account_reducer = (state = initialAccount, action) => {
  switch(action.type){
    case actionTypes.SET_WEB3_ACCOUNT:
      return{
        currentAccount: action.payload.currentAccount
      }
    default :
      return state
  }
}

const rootReducer = combineReducers({
  user: user_reducer,
  channel: channel_reducer,
  account: account_reducer
})

export default rootReducer;
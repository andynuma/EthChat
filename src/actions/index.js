import * as actionTypes from "./types";

//  User Actions
export const setUser = user => {
  return{
    type: actionTypes.SET_USER,
    payload:{
      currentUser: user
    }
  }
}

export const clearUser = () =>  {
  return{
    type:actionTypes.CLEAR_USER
  }
}

//  Channel Actions
export const setCurrentChannel = channel => {
  // 引数のchannelがpayloadに入る
  return{
    type:actionTypes.SET_CUREENT_CHANNEL,
    payload:{
      currentChannel: channel
    }
  }
}

// web3 account
export const setCurrentAccount = account => {
  return {
    type:actionTypes.SET_WEB3_ACCOUNT,
    payload:{
      currentAccount: account
    }
  }
}
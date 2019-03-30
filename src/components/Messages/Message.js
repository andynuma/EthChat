import React from "react"
import moment from "moment"
import { Comment } from "semantic-ui-react"
import web3 from "../../web3Provider"

const isOwnMessage = (message, user) =>  {
 return message.user.id === user.uid? "message__self" : ""
}

const timeFromNow = (timestamp) => moment(timestamp).fromNow()

export const sendEther = async(from, to) => {
  // from : web3.eth.account[0]
  // to :  message.user.account
  // send eth
  let toAddress = await to[0]
  await web3.eth.sendTransaction({ from: from, to: toAddress, value: web3.utils.toWei("0.01", "ether") })
  console.log("from:", from, "to", toAddress)

}

const Message = ({message, user, account}) =>  (
  <Comment>
    <Comment.Avatar src={message.user.avatar} />
    <Comment.Content className={isOwnMessage(message, user)}>
      <Comment.Author as="a">{message.user.name} </Comment.Author>
      <Comment.Metadata>{timeFromNow(message.timestamp)}</Comment.Metadata>
      <Comment.Text>{message.content}</Comment.Text>
      {/*  */}
      {/* ボタンのonClickに送金関数 */}
      {/*  {message.user.account} にamessageを送信したccountの情報が入っている */}
      <button size="Mini"  class="positive ui button mini ui button" onClick={() => { sendEther(account,message.user.account) }}> send </button>
      {/* <div className="addressShow" class="ui button" data-tooltip={accou/>nt} >Send</div> */}
    </Comment.Content>
  </Comment>
)

export default Message;

import React from "react";
import { Segment, Comment } from "semantic-ui-react"
import MessageHeader from "./MessageHeader"
import MessageForm from "./MessageForm"
import Message from "./Message"
import firebase from "../../firebase"

class Messages extends React.Component{
  state = {
    messages : [],
    messagesLoading:true,
    messagesRef : firebase.database().ref("messages"),
    channel: this.props.currentChannel,
    user: this.props.currentUser,
    account:this.props.currentAccount,
    searchTerm:"",
    searchResults:[],
  }

  componentDidMount() {
    const { channel, user } = this.state
    if(channel && user) {
      this.addListeners(channel.id)
    }
    this.setWeb3()
  }

  setWeb3 = async() => {
    let accounts = await this.state.account
    let myAccount =  await accounts
    this.setState({ account : myAccount[0]})
    console.log("Messages account",this.state.account)
  }

  addListeners = channelId => {
    this.addMessageListener(channelId);
  }

  addMessageListener = channelId => {
    let loadedMessages = []
    this.state.messagesRef.child(channelId).on("child_added", snap => {
      loadedMessages.push(snap.val())
      // console.log(loadedMessages)
      this.setState({
        messages : loadedMessages,
        messagesLoading: false
      })
    })
  }

  displayMessages = (messages) => (
    messages.length > 0 && messages.map(message => (
      <Message
        key={message.timestamp}
        message={message}
        user={this.state.user}
        account={this.state.account}
      />
    ))
  )

  setSearchMessages = () => {
    // ここはstateからmessagesをとることでchannelごとの処理をしなくていい
    const channelMessages = [...this.state.messages]
    const regex = new RegExp(this.state.searchTerm, "gi");
    const searchResults = channelMessages.reduce((acc, message) => {
      if (
        (message.content && message.content.match(regex)) ||
        message.user.name.match(regex)
      ) {
        acc.push(message);
      }
      return acc;
    }, []);
    // console.log(searchResults)
    this.setState({searchResults})
  }

  handleSearchChange = event =>  {
    // console.log(event)
    this.setState(
      {
        searchTerm : event.target.value
      },
      () => this.setSearchMessages()  // これで逐一セットする
    )
  }

  render(){
    const { messagesRef, channel, user, messages, searchTerm ,searchResults, account } = this.state
    // console.log(searchTerm)
    // console.log(searchResults)
    console.log("your account", account)
    return(
      <React.Fragment>
        <MessageHeader
        // currentChannel={channel}
        // channelName={this.displayChannelName(channel)}
          searchTerm={searchTerm}
          channelName={channel && channel.name}
          handleSearchChange={this.handleSearchChange}
        />

          <Segment>
            <Comment.Group className="messages">
            {searchTerm
            ? this.displayMessages(searchResults)
            : this.displayMessages(messages)}

            </Comment.Group>
          </Segment>

          <MessageForm
            messagesRef={messagesRef}
            currentChannel={channel}
            currentUser={user}
            currentAccount={account}
          />
      </React.Fragment>
    )
  }
}

export default Messages;
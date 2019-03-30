import React from "react"
import firebase from "../../firebase"
import{ Menu,Icon, Modal,Input,Button,Form } from "semantic-ui-react"
import { setCurrentChannel } from "../../actions"
import { connect } from "react-redux"

class Channels extends React.Component{
  state = {
    activeChannel:"",
    user:this.props.currentUser,
    channels: [],
    modal:false,
    channelName:"",
    channelDetails:"",
    channelsRef:firebase.database().ref("channels"),
    firstload:true
  }

  componentDidMount(){
    this.addListeners();
  }

  componentWillUnmount(){
    this.state.channelsRef.off()
  }

  addListeners = () => {
    let loadedChannels = [];
    this.state.channelsRef.on("child_added", snap => {
      // 配列にfirebaseのdatabaseのデータを追加する
      // snapshot のデータは val() メソッドで取得できる
      loadedChannels.push(snap.val());
      console.log(snap.val())
      // console.log(snap)
      console.log(loadedChannels);
      // 取得したsnapShotをstateに追加
      this.setState({ channels: loadedChannels }, () => this.setFirstChannel())
    })
  }

  setFirstChannel = () =>  {
    const firstChannel = this.state.channels[0]
    if(this.state.firstload && this.state.channels.length > 0){
      this.props.setCurrentChannel(firstChannel)
      this.setActiveChannel(firstChannel)
    }
    this.setState({firstload:false})
  }

  addChannel = () => {
    const { channelsRef,channelName,channelDetails,user } = this.state;

    const key = channelsRef.push().key;

    const newChannel = {
      id:key,
      name: channelName,
      details: channelDetails,
      createdBy:{
        name:user.displayName,
        avatar: user.photoURL
      }
    }

    channelsRef
    .child(key)
    .update(newChannel)
    .then(() => {
      this.setState({channelName:"", channelDetails:""})
      this.closeModal()
      console.log("channel added")
    })
    .catch(err => {
      console.error(err)
    })
  }

  handleSubmit = event => {
    event.preventDefault();
    if(this.isFormValid(this.state)){
      this.addChannel()
      console.log("channel created")
    }
  }

  handleChange = (event) =>{
    this.setState({[event.target.name] : event.target.value})
  }

  changeChannel = channel => {
    this.setActiveChannel(channel)
    this.props.setCurrentChannel(channel)
  }

  setActiveChannel = channel => {
    this.setState({activeChannel:channel.id})
  }

  displayChannels = channels => (
    // this.state.channelをmapで表示
    channels.length > 0 && channels.map(channel => (
      <Menu.Item
        key={channel.id}
        onClick={() => this.changeChannel(channel)}
        name={channel.name}
        style={{ opacity: 0.7 }}
        active={channel.id ===  this.state.activeChannel}
      >
      # {channel.name}
      </Menu.Item>
    ))
  )

  isFormValid = ({channelName,channelDetails}) => channelName && channelDetails;

  openModal = () => {
    this.setState({modal: true})
  }

  closeModal = () => {
    this.setState({modal: false})
  }

  render(){
    const { channels, modal } = this.state
    return(
      <React.Fragment>
        <Menu.Menu style={{paddingBottom: "2em"}}>
          <Menu.Item>
            <span>
              <Icon name="exchange" /> CHANNELS
            </span>{" "}
            ({channels.length}) <Icon name="add" onClick={this.openModal}/>
          </Menu.Item>
          {this.displayChannels(channels)}
        </Menu.Menu>

        {/* // Add channel Modal */}
        <Modal basic open={modal} onClose={this.closeModal}>
          <Modal.Header>Add a Channels</Modal.Header>
          <Modal.Content>
            <Form onSubmit={this.handleSubmit}>
              <Form.Field>
                <Input
                  fluid
                  label="Name of Channel"
                  name="channelName"
                  onChange={this.handleChange}
                />
              </Form.Field>

              <Form.Field>
                <Input
                  fluid
                  label="About this Channel"
                  name="channelDetails"
                  onChange={this.handleChange}
                />
              </Form.Field>
            </Form>
          </Modal.Content>

          <Modal.Actions>
            <Button color="green" inverted onClick={this.handleSubmit}>
              <Icon name="checkmark"/> Add
            </Button>
            <Button color="red" inverted onClick={this.closeModal}>
              <Icon name="checkmark"/> Cancel
            </Button>
          </Modal.Actions>
        </Modal>
      </React.Fragment>
    )
  }
}

export default connect(null, { setCurrentChannel })(Channels);
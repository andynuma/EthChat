import React from "react"
import firebase from "../../firebase"

import { Header, Grid ,Dropdown,Image, Icon } from "semantic-ui-react";

class UserPanel extends React.Component {

  state={
    name:"",
    url : ""
  }

  componentDidMount(){
    const userRef = firebase.database().ref(`users/${this.props.currentUser.uid}/`)
    userRef.on("value",(data)=>{
      const res = data.val()
      if(res !== null && res.name !== null && res.avatar !== null){
        this.setState({name: res.name, url: res.avatar})
      }
      console.log(this.state.name, this.state.url)
    })
  }

  dropdownOptions = () => [
    {
      key:"user",
      text: <span>Signed in as <strong>{this.state.name}</strong></span>,
      disabled: true
    },
    {
      key:"signout",
      text:<span onClick={this.handleSignout}>Sign Out</span>
    }
  ]

  handleSignout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => console.log("signed out"))
  }

  render() {

    return(
      <Grid style={{ backgrond:"#4c3c4c" }}>
        <Grid.Column>
          <Grid.Row style={{ padding: "1.2em", margin:0 }}>
            {/* App Header */}
            <Header inverted floated="left" as="h2">
              <Icon name="wechat"/>
              <Header.Content>EthChat</Header.Content>
            </Header>
          </Grid.Row>

          {/* User Dropdown */}
          <Header style={{ padding:"0.25em" }} as="h4" inverted>
            <Dropdown trigger={
              <span>
                <Image src={this.state.url} spaced="right" avatar/>
              {this.state.name}
              </span>
            } options={this.dropdownOptions()}/>
          </Header>
        </Grid.Column>
      </Grid>
    );
  }
}

export default UserPanel;
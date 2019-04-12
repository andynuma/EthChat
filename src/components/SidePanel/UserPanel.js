import React from "react"
import firebase from "../../firebase"

import { Header, Grid ,Dropdown,Image, Icon } from "semantic-ui-react";

class UserPanel extends React.Component {

  componentDidMount(){
    // const { user } = this.state
    console.log("UserPanel",this.props.currentUser)
    console.log("User panel displayname ", this.props.currentUser.displayName)
    console.log("User panel photoURL", this.props.currentUser.photoURL)
  }

  dropdownOptions = () => [
    {
      key:"user",
      text: <span>Signed in as <strong>{this.props.currentUser.displayName}</strong></span>,
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
    console.log(this.props.currentUser)
    console.log(this.props.currentUser.displayName)

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
                <Image src={this.props.currentUser.photoURL} spaced="right" avatar/>
              {this.props.currentUser.displayName}
              </span>
            } options={this.dropdownOptions()}/>
          </Header>
        </Grid.Column>
      </Grid>
    );
  }
}

export default UserPanel;
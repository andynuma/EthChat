import React from "react"
import firebase from "../../firebase"

import { Header, Grid ,Dropdown,Image } from "semantic-ui-react";

class UserPanel extends React.Component {
  state = {
    user: this.props.currentUser
  }

  dropdownOptions = () => [
    {
      key:"user",
      text: <span>Signed in as <strong>{this.state.user && this.state.user.displayName}</strong></span>,
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
    // console.log(this.props.currentUser)
    const { user } = this.state
    console.log("user",user)

    return(
      <Grid style={{ backgrond:"#4c3c4c" }}>
        <Grid.Column>
          <Grid.Row style={{ padding: "1.2em", margin:0 }}>
            {/* App Header */}
            <Header inverted floated="left" as="h2">
              <i class="wechat icon"></i>
              <Header.Content>EthChat</Header.Content>
            </Header>
          </Grid.Row>

          {/* User Dropdown */}
          <Header style={{padding:"0.25em"}} as="h4" inverted>
            <Dropdown trigger={
              <span>
                <Image src={user.photoURL} spaced="right" avatar/>
              {user.displayName}
              </span>
            } options={this.dropdownOptions()}/>
          </Header>
        </Grid.Column>
      </Grid>
    );
  }
}

export default UserPanel;
import React from 'react';
import { Grid } from "semantic-ui-react"
import "./App.css";
import { connect } from "react-redux"

import Messages from "./Messages/Messages"
import SidePanel from "./SidePanel/SidePanel"
import MetaPanel from "./MetaPanel/MetaPanel"

const App = ({currentUser, currentChannel,currentAccount}) => (

  <Grid columns="equal" className="app" style={{background : "#eee"}}>
    <SidePanel
      currentUser={currentUser}
      key={currentUser && currentUser.uid}
    />

    <Grid.Column style={{marginLeft :270}}>
      <Messages
        key={currentChannel &&  currentChannel.id}
        currentChannel={currentChannel}
        currentUser={currentUser}
        currentAccount={currentAccount}
      />
    </Grid.Column>

    <Grid.Column width={4}>
      <MetaPanel
        currentAccount={currentAccount}
      />
    </Grid.Column>

  </Grid>
)

const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
  currentChannel: state.channel.currentChannel,
  currentAccount: state.account.currentAccount,
  // isLoading: state.user.isLoading
})

export default connect(mapStateToProps)(App);

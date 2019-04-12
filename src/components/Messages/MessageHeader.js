import React from "react"
import { Header, Segment, Input} from "semantic-ui-react"

class MessageHeader extends React.Component{
  state = {
    channel : this.props.channelName,
  }

  render(){
    const { channel } = this.state
    const { handleSearchChange } = this.props

    return(
      <Segment clearing>
        <Header fluid="true" as="h2" floated="left" style={{ marginBottom: 0}}>
          <span>
              # {channel}
            {/* <Icon  color="black"/> */}
          </span>
          <Header.Subheader>
            {/* 2 Users */}
          </Header.Subheader>
        </Header>

        <Header floated="right">
          <Input
            size="mini"
            onChange={handleSearchChange}
            icon="search"
            name="searchTerm"
            placeholder="Search Messages"
          />
        </Header>
      </Segment>
    )
  }
}

export default MessageHeader;
import React from "react";
import {Grid, Form, Segment, Button, Header, Message, Icon} from "semantic-ui-react"
import {Link} from "react-router-dom"
import firebase from "../../firebase";

class Login extends React.Component{
  state = {
    email:"",
    password:"",
    errors:[],
    loading:false,
  }

  displayErrors = errors => errors.map((error,i) => <p key={i}> {error.message}</p>)

  handleInputError = (errors,inputName) => {
    return errors.some(error => error.message.toLowerCase().includes(inputName) ? "error":"")
  }

  handleChange = (event) =>  {
    this.setState({[event.target.name]:event.target.value})
  }

  handleSubmit = (event) => {
    event.preventDefault();
    if(this.isFormValid(this.state)){
      this.setState({errors:[], loading:true})
      firebase
        .auth()
        .signInWithEmailAndPassword(this.state.email, this.state.password)
        .then( signInUser => {
          console.log(signInUser);
        })
        .catch(err =>  {
          console.error(err)
          this.setState({
            errors:this.state.errors.concat(err),
            loading:false
          })
        })
    }
  }

  isFormValid = ({email, password}) => email && password;

  render(){
    const {password,email,errors,loading} = this.state
    return(
      <Grid textAlign="center" verticalAlign="middle" className="app">
        <Grid.Column style={{ maxWidth: 450 }}>
            <Header as="h1" icon color="violet" textAlign="center">
              <Icon name="code branch" color="violet" />
                Login for EthChat
            </Header>
            <Form onSubmit={this.handleSubmit} size="large" >
                <Segment stacked>
                    <Form.Input fluid name="email" icon="mail" iconPostion="left" placeholder="email"
                    onChange={this.handleChange} value={email} type="email" className={this.displayErrors(errors,"email")}/>
                    <Form.Input fluid name="password" icon="lock" iconPostion="left" placeholder="password"
                    onChange={this.handleChange} value={password} type="password" className={this.displayErrors(errors,"password")}/>
                    <Button disable={loading} className={loading ?  "loading" : ""} color="violet" fluid size="large">Submit</Button>
                </Segment>
            </Form>
            {this.state.errors.length > 0 && (
              <Message>
                <h3>Error</h3>
                {this.displayErrors(errors)}
              </Message>
            )}
            <Message>Don't have a accounts ? <Link to="/register">Register</Link></Message>
        </Grid.Column>
      </Grid>
    )
  }
}

export default Login;
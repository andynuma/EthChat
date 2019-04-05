import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';

import { BrowserRouter as Router, Switch,Route,withRouter} from "react-router-dom"
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import firebase from "./firebase"

import 'semantic-ui-css/semantic.min.css'

import { createStore} from "redux";
import { Provider, connect } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension"
import rootReducer from './reducers';
import { setUser, clearUser,setCurrentAccount } from "./actions"
import Spinner from "./Spinner"

import web3 from "./web3Provider"

const store = createStore(rootReducer, composeWithDevTools())


class Root extends React.Component {
  componentDidMount() {
    // Login or not Login
    firebase.auth().onAuthStateChanged(user => {
      if (user){
        this.props.history.push("/")
        this.props.setUser(user);
        // console.log(user)
      }
      else {
        this.props.history.push("/login")
        this.props.clearUser()
      }
    })

    // web3
    this.web3Checker()
  }

  web3Checker = async() => {
    let account = await web3.eth.getAccounts()
    await this.props.setCurrentAccount(account)
    // console.log("account:",account)
  }

  render(){
    return this.props.isLoading ? <Spinner /> : (
          <Switch>
            <Route exact path="/" component={App}/>
            <Route path="/login" component={Login}/>
            <Route path="/register" component={Register}/>
          </Switch>
      )
    }
}

const mapStateFromProps = state => ({
  isLoading: state.user.isLoading
})

const RootWithAuth = withRouter(connect(mapStateFromProps, { setUser, clearUser,setCurrentAccount })(Root))

ReactDOM.render(
<Provider store={store}>
<Router><RootWithAuth/></Router>
</Provider>, document.getElementById('root'));
registerServiceWorker();

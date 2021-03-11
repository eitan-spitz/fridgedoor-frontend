import './App.css';
import React from 'react';
import FamilyContainer from './Containers/FamilyContainer';
// import {URL} from './index'
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux'
import { loginUser } from './Redux/actions';
import SideMenu from './Components/SideMenu'
import Navbar from './Components/Navbar';


class App extends React.Component {

  state = {
    family: null
  }
  
  componentDidMount(){
    // fetch(`${this.fdcData.url}api_key=${this.fdcData.apiKey}&query=${this.fdcData.query}&pageSize=${this.fdcData.pageSize}`, {
    //   method: "GET",
    //   headers: {
    //     "Accept": "application/json",
    //     "Content-type": "application/json"
    //   }
    // })
    // .then(r => r.json())
    // .then(returnedData => console.log(returnedData))
      this.props.login()
  }

  setFamily = () => {
    this.setState({family: this.props.user.families[0]})
  }

  render(){
    return (
      <div className="container" id="app">
      <Switch>
        <Route path='/home' render={ () => {
          return(
            <div className="homePage">
              <h1>FridgeDoor</h1>
            </div>
          )
        }} />
        <Route path='/families' component={FamilyContainer} />
      </Switch>
      <Navbar setFamily={this.setFamily} />
      <SideMenu family={this.state.family} />
      </div>
    )
  }
}

function msp(state){
  return{
    user: state.user
  }
}

function mdp(dispatch){
  return {
    login: () => dispatch(loginUser())
  }
}

export default withRouter(connect(msp, mdp)(App));

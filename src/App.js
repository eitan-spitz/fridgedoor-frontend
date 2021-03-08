import './App.css';
import React from 'react';
import FamilyContainer from './Containers/FamilyContainer';
// import {URL} from './index'
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux'
import { loginUser } from './Redux/actions';
import Navbar from './Components/Navbar';


class App extends React.Component {

  state = {
    query: "cheese"
  }

  fdcData = {
    url: "https://api.nal.usda.gov/fdc/v1/foods/search?",
    apiKey: "CS1Rfy9P2MqeJeHkcNnhBjhyMBJ9d6G5cUSdkOAu",
    query: this.state.query,
    pageSize: 5
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

  render(){
    return (
      <div className="App" id="app">
      <Navbar />
      <Switch>
        <Route path='/home' render={ () => {
          return(
            <>
              <h1>FridgeDoor</h1>
            </>
          )
        }} />
        <Route path='/families' component={FamilyContainer} />
      </Switch>
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

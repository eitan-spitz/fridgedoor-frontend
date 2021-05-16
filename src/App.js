import './App.css';
import React from 'react';
import FamilyContainer from './Containers/FamilyContainer';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux'
import { loginUser } from './Redux/actions';
import SideMenu from './Components/SideMenu'
import Navbar from './Components/Navbar';


class App extends React.Component {

  state = {
    family: null,
    showAbout: false
  }
  
  componentDidMount(){
      this.props.login()
  }

  setFamily = () => {
    this.setState({family: this.props.user.families[0]})
  }

  showAbout = () => {
    this.setState({showAbout: !this.state.showAbout})
  }

  render(){
    return (
      <div className="container" id="app">
      <Switch>
        <Route path='/home' render={ () => {
          return(
            <>
              <div className="homePage">
                <h1>FridgeDoor</h1>
              </div>
              {this.state.showAbout ?
                <div className="about">
                  <h3>Let’s open the FridgeDoor.</h3>
                  <h4>FridgeDoor is a fridge management app that allows families to have a centralized database for fridge management.</h4>
                  <h3>Designed to ease your mind.</h3>
                  <h4>Whether you’re out shopping or contemplating getting off the couch for a snack, you’ll always know exactly what’s waiting for you. Don’t worry about whether or not you’re missing something important for that recipe you’re thinking of trying-- we’ve got you covered.</h4>
                  <h3>Fridge(s) for the whole family.</h3>
                  <h4>Wondering what’s stored in the deep-freezer downstairs? We’ll handle that too -- FridgeDoor allows for multiple fridges to be managed from one account, and that account can be accessed by the whole family (or your roommates, if you trust them).</h4>
                </div>
                :
                ''
              }
            </>
          )
        }} />
        <Route path='/families' component={FamilyContainer} />
      </Switch>
      <Navbar setFamily={this.setFamily} showAbout={this.showAbout} />
      <SideMenu family={this.state.family} setFamily={this.setFamily} />
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

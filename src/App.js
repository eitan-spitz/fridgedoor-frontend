import './App.css';
import React from 'react';
import FamilyContainer from './Containers/FamilyContainer';
// import {URL} from './index'
// import { Route, Switch } from 'react-router-dom';
// import { connect } from 'react-redux'

class App extends React.Component {

  render(){
    return (
      <div className="App">
        <h1>hello from app</h1>
        <FamilyContainer />
      </div>
    )
  }
}

export default App;

import React, { Component } from 'react';
import './App.css';

import NavBar from "./components/NavBar";
// import {BrowserRouter, Route, Link, Switch} from 'react-router-dom'

class App extends Component {

  handleClickAddNV = (name) => {
    // this.showModal()
  }

  render() {
    return (
      <div className="App">
          <NavBar handleClickAddNV={this.handleClickAddNV}></NavBar>
      </div>
    )
  }
}

export default App;

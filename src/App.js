import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Customerlist from './components/Customerlist';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h2>Customer List</h2>

        </header>
        <Customerlist/>
      </div>
    );
  }
}

export default App;

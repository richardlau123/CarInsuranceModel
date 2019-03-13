import React, { Component } from 'react';
import CarAgent from './CarAgent';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <CarAgent/>
          
        </header>
      </div>
    );
  }
}

export default App;

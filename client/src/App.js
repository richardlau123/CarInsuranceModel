import React, { Component } from 'react';
import InsuranceInsert from './InsuranceInsert';
import './App.css';
import DriverSelect from './DriverSelect';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <DriverSelect/>
          {/* <InsuranceInsert/> */}
          
        </header>
      </div>
    );
  }
}

export default App;

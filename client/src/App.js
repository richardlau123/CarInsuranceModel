import React, { Component } from 'react';
import InsuranceInsert from './InsuranceInsert';
import './App.css';
import VehicleSelect from './VehicleSelect';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <VehicleSelect/>
          {/* <InsuranceInsert/> */}
          
        </header>
      </div>
    );
  }
}

export default App;

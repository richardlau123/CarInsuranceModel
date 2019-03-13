import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

class CarAgent extends Component {
  render() {
    return (
        <Paper elevation={3}>
        
        <form className="car-agent-form">
        <TextField
        label="Date"
        type="date"
        margin="normal"
        defaultValue="2019-03-04"
        InputLabelProps={{
            shrink: true,
        }}
        />
        <TextField
        label="VIN"
        margin="normal"
        />
        <TextField
        label="License Plate"
        margin="normal"
        />
        <TextField
        label="Employee ID"
        margin="normal"
        />
        <Button variant="contained" color="primary" style={{alignSelf: "center"}}>
        Submit
        </Button>
        </form>
        </Paper>
    );
  }
}

export default CarAgent;

import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

class InsuranceInsert extends Component {

  render() {
    return (
        <form className="car-agent-form">
        <TextField
        label="Date"
        type="date"
        className="form-input"
        margin="normal"
        defaultValue="2019-03-28"
        InputLabelProps={{
            shrink: true,
        }}
        />
        <TextField
        label="VIN"
        className="form-input"
        margin="normal"
        />
        <TextField
        label="License Plate"
        className="form-input"
        margin="normal"
        />
        <TextField
        label="Employee ID"
        className="form-input"
        margin="normal"
        />
        <Button variant="contained" color="primary" style={{alignSelf: "center", marginRight:"5px"}}>
        Submit
        </Button>
        </form>
    );
  }
}

export default InsuranceInsert;

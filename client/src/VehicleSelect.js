import React, { Component } from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import VehicleView from './VehicleView'

class VehicleSelect extends Component{

    state = {
        model: false,
        vin: false,
        licensePlate: false,
        brand: false,
        modelYear: false,
        licenseNumber: false,
        licensePlateText: "",
        vehicleData: null,
    }

    handleSelectAll = () => {
        this.setState({
            model: true,
            vin: true,
            licensePlate: true,
            brand: true,
            modelYear: true,
            licenseNumber: true,
        })
    }

    handleVehicleProjection = async () => {
        let {model, vin, licensePlate, brand, modelYear, licenseNumber} = this.state;
        let response = await fetch(`/vehicle/projection/${model}/true/${licensePlate}/${brand}/${modelYear}/${licenseNumber}`);
        
        let responseJSON = await response.json();
        this.setState({vehicleData: responseJSON})
            
    };

    searchByLicensePlate = async () => {
        let response = await fetch(`/vehicle/select/${this.state.licensePlateText}`);
        
        let responseJSON = await response.json();
        this.setState({vehicleData: responseJSON})
    };

    prepare = (data) => {
        if (!data) {
            return null;
        }
        let viewable = [];
        for(let i in data) {
            let obj = data[i];
            let clone = Object.assign({}, obj);
            clone['id']=clone['vin'];
            if(!this.state.vin)
                delete clone['vin'];
            viewable.push(clone);
        }
        return viewable
    };

    render() {
        return (
            <div className="car-agent-view" >
            <div className="row">
                <div className="column">
                <span>Select from Vehicle Database</span>
                    <FormGroup column="true">
                        <FormControlLabel control={<Checkbox onChange={() => {this.setState({model: !this.state.model})}} checked={this.state.model} value="model"/>} label="Model" />
                        <FormControlLabel control={<Checkbox onChange={() => {this.setState({vin: !this.state.vin})}} />} checked={this.state.vin} label="VIN" />
                        <FormControlLabel control={<Checkbox onChange={() => {this.setState({licensePlate: !this.state.licensePlate})}} checked={this.state.licensePlate} />} label="License Plate" />
                        <FormControlLabel control={<Checkbox onChange={() => {this.setState({brand: !this.state.brand})}} checked={this.state.brand} />} label="Brand" />
                        <FormControlLabel control={<Checkbox onChange={() => {this.setState({modelYear: !this.state.modelYear})}} checked={this.state.modelYear}  />} label="Model Year" />
                        <FormControlLabel control={<Checkbox onChange={() => {this.setState({licenseNumber: !this.state.licenseNumber})}} checked={this.state.licenseNumber}  />} label="License Number" />
                    </FormGroup>
                
                <div className="row">
                    <Button onClick={this.handleVehicleProjection} variant="contained" color="primary" style={{alignSelf: "center", marginRight:"5px"}}>
                        View
                    </Button>
                    <Button onClick={this.handleSelectAll} variant="contained" color="primary" style={{alignSelf: "center", marginRight:"5px"}}>
                        Select All
                    </Button>
                </div>
                    <form className="car-agent-form">
                        <TextField
                            label="License Plate"
                            className="form-input"
                            margin="normal"
                            value={this.state.licensePlateText}
                            onChange={(e) => {this.setState({ licensePlateText: e.target.value })}}
                        />
                        <Button onClick={this.searchByLicensePlate} variant="contained" color="primary" style={{alignSelf: "center", marginRight:"5px"}}>
                            Search By license plate
                        </Button>
                    </form>
                </div>
                <div className="column">
                    <VehicleView view={this.prepare(this.state.vehicleData)}/>
                </div>
            </div>
            
            </div>
        )
      }
}

export default VehicleSelect
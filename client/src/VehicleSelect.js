import React, { Component } from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import VehicleView from './VehicleView'
import Axios from 'axios';
import {Tabs} from '@yazanaabed/react-tabs';

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
		oldValueText: "",
		newValueText: "",
        selected: [],
		insertVText1: "",
		insertVText2: "",
		insertVText3: "",
		insertVText4: "",
		insertVText5: "",
		insertVText6: "",
		insertDText1: "",
		insertDText2: "",
		insertDText3: "",
		insertDText4: "",
		insertDText5: "",
    };

    handleSelectAll = () => {
        this.setState({
            model: true,
            vin: true,
            licensePlate: true,
            brand: true,
            modelYear: true,
            licenseNumber: true,
        })
    };

    handleVehicleProjection = async () => {
        let {model, vin, licensePlate, brand, modelYear, licenseNumber} = this.state;
        let response = await fetch(`/vehicle/projection/${model}/true/${licensePlate}/${brand}/${modelYear}/${licenseNumber}`);
        
        let responseJSON = await response.json();
        this.setState({vehicleData: responseJSON})
            
    };

    deleteByLicensePlate = async () => {
        Axios.delete(`/vehicle/delete/${this.state.licensePlateText}`)
            .then((res) => {this.handleVehicleProjection();})
            .catch((err) => {console.log(err.status);});

    };

    searchByLicensePlate = async () => {
        if(!this.state.licensePlateText){
            let errorMessage = [{'Error' : 'Please specifiy a license plate to search for'}];
            this.setState({
                vehicleData: errorMessage
            });
            return
        }
        let response = await fetch(`/vehicle/select/${this.state.licensePlateText}`);
        
        let responseJSON = await response.json();
        this.setState({vehicleData: responseJSON})
    };

    prepare = data => {
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

    handleCountVehicleBrand = async () => {
        let response = await fetch('/countvehicleinbrand');
        
        let responseJSON = await response.json();
        this.setState({vehicleData: responseJSON})
    };

    handleJoinVehicleAndDriver = async () => {
        let response = await fetch('/vehicleanddriver');

        let responseJSON = await response.json();
        this.setState({vehicleData: responseJSON})
    };

    handleAllBrandDriver = async () => {
        let response = await fetch('/driver/buyallbrand');

        let responseJSON = await response.json();
        this.setState({vehicleData: responseJSON})
    };

	updateByVin = async () => {
		console.log("update by vin");
        Axios.put(`/vehicle/update/vin/${this.state.oldValueText}/${this.state.newValueText}`)
			.then((res) => {this.handleVehicleProjection();})
            .catch((err) => {console.log(err.status);});
    };

    deleteSelected = () => {
        let vins = this.state.selected;
        let set = "(";
        if(vins.length > 0)
            set += "'" +vins[0]+ "'";
        for(let i = 1; i < vins.length; i++) {
            set += ", '"+vins[i]+"'"
        }
        set += ")";
        Axios.delete('/vehicle/delete', {data: {vins: set}})
            .then((res) => {this.setState({selected: []}); this.handleVehicleProjection(); this.forceUpdate()})
            .catch((err) => {console.log(err.status)});
    };

    trim = obj => {
        let clone = Object.assign({}, obj);
        delete clone['id'];
        return clone;
    };

    onCheckChange = obj => {let id = obj['id'];
        this.setState({selected: this.state.selected.indexOf(id) !== -1 ?
        this.state.selected.filter(word => word !== id) :
        this.state.selected.concat([id])});

    };

	updateByLicensePlate = async () => {
		console.log("update by lp");
        Axios.put(`/vehicle/update/lp/${this.state.oldValueText}/${this.state.newValueText}`)
			.then((res) => {this.handleVehicleProjection();})
            .catch((err) => {console.log(err.status);});
    };

	insertVehicle = async () => {
		console.log("insertVehicle");
        Axios.put(`/vehicle/insert/${this.state.insertVText1}/${this.state.insertVText2}/${this.state.insertVText3}/${this.state.insertVText4}/${this.state.insertVText5}/${this.state.insertVText6}`)
			.then((res) => {this.handleVehicleProjection();})
            .catch((err) => {console.log(err.status);});
    };

	insertDriver = async () => {
		console.log("insertDriver");
        Axios.put(`/driver/insert/${this.state.insertDText1}/${this.state.insertDText2}/${this.state.insertDText3}/${this.state.insertDText4}/${this.state.insertDText5}`)
			.then((res) => {this.handleVehicleProjection();})
            .catch((err) => {console.log(err.status);});
    };

    render() {
        return (
            <Tabs activeTab={{id:"table"}}>
                <React.Fragment>
                <Tabs.Tab id="table" title="Vehicles">
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
                        <div className="row">
                            <Button onClick={this.handleCountVehicleBrand} variant="contained" color="primary" style={{alignSelf: "center", marginRight:"5px"}}>
                                Get vehicle count by brand
                            </Button>
                        </div>
                        <div className="row">
                            <Button onClick={this.handleJoinVehicleAndDriver} variant="contained" color="primary" size="small" style={{alignSelf: "center",}}>
                                Join vehicle and driver tables
                            </Button>
                        </div>
                        <div className="row">
                            <Button onClick={this.handleAllBrandDriver} variant="contained" color="primary" size="small" style={{alignSelf: "center",}}>
                                Get drivers that own all brands of cars
                            </Button>
                        </div>
                        <formGroup className="car-agent-form">
                            <TextField
                                label="License Plate"
                                className="form-input"
                                margin="normal"
                                value={this.state.licensePlateText}
                                onChange={(e) => {this.setState({ licensePlateText: e.target.value })}}
                            />
                            <div className="row">
                            <Button className="button-input" onClick={this.searchByLicensePlate} variant="contained" color="primary" style={{alignSelf: "left", marginRight:"5px"}}>
                                Search By license plate
                            </Button>
                            </div>
                            <div className="row">
                            <Button className="button-input" onClick={this.deleteByLicensePlate} variant="contained" color="primary" style={{alignSelf: "left", marginRight:"5px"}}>
                                Delete By license plate
                            </Button>
                            </div>
                        </formGroup>
                        </div>
                        <div className="column">
                            <div>
                                <form className="update-form">
                                    <TextField
                                        label="Old"
                                        className="form-input"
                                        margin="normal"
                                        value={this.state.oldValueText}
                                        onChange={(e) => {this.setState({ oldValueText: e.target.value })}}
                                    />
                                    <TextField
                                        label="New"
                                        className="form-input"
                                        margin="normal"
                                        value={this.state.newValueText}
                                        onChange={(e) => {this.setState({ newValueText: e.target.value })}}
                                    />
                                    <Button onClick={this.updateByVin} variant="contained" color="primary" style={{alignSelf: "center", marginRight:"5px"}}>
                                        Update VIN
                                    </Button>
                                    <Button onClick={this.updateByLicensePlate} variant="contained" color="primary" style={{alignSelf: "center", marginRight:"5px"}}>
                                        Update LicensePlate
                                    </Button>
                                </form>
                            </div>
                            <div className="row">
                                <VehicleView view={this.prepare(this.state.vehicleData)}
                                             selected={this.state.selected}
                                             deleteSelected={this.deleteSelected}
                                             onCheckChange={this.onCheckChange}
                                             trim={this.trim}
                                             id={"viewTable"}/>
                            </div>
                        </div>
                    </div>
                    </div>
                </Tabs.Tab>
                <Tabs.Tab id="insertion" title="Add">
                    <div className="car-agent-view" >
                    <div><span>Add a Vehicle or Driver to the Database</span>
                    <div className="row">
                        <form className="car-agent-form">
                            <TextField
                                label="model"
                                className="form-input"
                                margin="normal"
                                value={this.state.insertVText1}
                                onChange={(e) => {this.setState({ insertVText1: e.target.value })}}
                            />
                            <TextField
                                label="vin"
                                className="form-input"
                                margin="normal"
                                value={this.state.insertVText2}
                                onChange={(e) => {this.setState({ insertVText2: e.target.value })}}
                            />
                            <TextField
                                label="licenseplate"
                                className="form-input"
                                margin="normal"
                                value={this.state.insertVText3}
                                onChange={(e) => {this.setState({ insertVText3: e.target.value })}}
                            />
                            <TextField
                                label="brand"
                                className="form-input"
                                margin="normal"
                                value={this.state.insertVText4}
                                onChange={(e) => {this.setState({ insertVText4: e.target.value })}}
                            />
                            <TextField
                                label="modelyear"
                                className="form-input"
                                margin="normal"
                                value={this.state.insertVText5}
                                onChange={(e) => {this.setState({ insertVText5: e.target.value })}}
                            />
                            <TextField
                                label="licensenumber"
                                className="form-input"
                                margin="normal"
                                value={this.state.insertVText6}
                                onChange={(e) => {this.setState({ insertVText6: e.target.value })}}
                            />
                            <Button onClick={this.insertVehicle} variant="contained" color="primary" size="small" style={{alignSelf: "center", marginRight:"5px"}}>
                                Insert New Vehicle
                            </Button>
                        </form>
                        <form className="car-agent-form">
                            <TextField
                                label="License Number"
                                className="form-input"
                                margin="normal"
                                value={this.state.insertDText1}
                                onChange={(e) => {this.setState({ insertDText1: e.target.value })}}
                            />
                            <TextField
                                label="Name"
                                className="form-input"
                                margin="normal"
                                value={this.state.insertDText2}
                                onChange={(e) => {this.setState({ insertDText2: e.target.value })}}
                            />
                            <TextField
                                label="Address"
                                className="form-input"
                                margin="normal"
                                value={this.state.insertDText3}
                                onChange={(e) => {this.setState({ insertDText3: e.target.value })}}
                            />
                            <TextField
                                label="Phone Number"
                                className="form-input"
                                margin="normal"
                                value={this.state.insertDText4}
                                onChange={(e) => {this.setState({ insertDText4: e.target.value })}}
                            />
                            <TextField
                                label="DateOfBirth"
                                className="form-input"
                                margin="normal"
                                value={this.state.insertDText5}
                                onChange={(e) => {this.setState({ insertDText5: e.target.value })}}
                            />
                            <Button onClick={this.insertDriver} variant="contained" color="primary" size="small" style={{alignSelf: "center", marginRight:"5px"}}>
                                Insert New Driver
                            </Button>
                        </form></div>
                    </div>
                    </div>
                </Tabs.Tab>
            </React.Fragment>
        </Tabs>
        )
      }
}

export default VehicleSelect
{/*

						<form className="car-agent-form">
							<TextField
								label="License Number"
								className="form-input"
								margin="normal"
								value={this.state.insertDText1}
								onChange={(e) => {this.setState({ insertDText1: e.target.value })}}
							/>
							<TextField
								label="Name"
								className="form-input"
								margin="normal"
								value={this.state.insertDText2}
								onChange={(e) => {this.setState({ insertDText2: e.target.value })}}
							/>
							<TextField
								label="Address"
								className="form-input"
								margin="normal"
								value={this.state.insertDText3}
								onChange={(e) => {this.setState({ insertDText3: e.target.value })}}
							/>
							<TextField
								label="Phone Number"
								className="form-input"
								margin="normal"
								value={this.state.insertDText4}
								onChange={(e) => {this.setState({ insertDText4: e.target.value })}}
							/>
							<TextField
								label="DateOfBirth"
								className="form-input"
								margin="normal"
								value={this.state.insertDText5}
								onChange={(e) => {this.setState({ insertDText5: e.target.value })}}
							/>
							<Button onClick={this.insertDriver} variant="contained" color="primary" size="small" style={{alignSelf: "center", marginRight:"5px"}}>
								Insert New Driver
							</Button>
						</form>

                    </div>



                <div className="column">

*/}
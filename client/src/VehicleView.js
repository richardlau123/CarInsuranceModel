import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';
import Button from "@material-ui/core/Button";
import axios from 'axios';

class VehicleView extends Component{

    state = {
        selected: [],
    };

    deleteSelected = () => {
        let vins = [];
        for (let ind in this.state.selected) {
            vins.push(this.props.view[ind]['vin']);
        }
        let set = "(";
        if(vins.length > 0)
            set += "'" +vins[0]+ "'";
        for(let i = 1; i < vins.length; i++) {
            set += ", '"+vins[i]+"'"
        }
        set += ")";
        console.log(set);
        axios.delete('/vehicle/delete', {data: {vins: set}})
            .then((res) => {console.log("success")})
            .catch((err) => {console.log(err.status)});
    };

    trim = (obj) => {
        let clone = Object.assign({}, obj);
        delete clone['id'];
        return clone;
    };

    isSelected = id => {return this.state.selected.indexOf(id) !== -1};

    render(){
        if(this.props.view){
            return (
                <div>
                    <Table>
                    <TableHead>
                        <TableRow>
                            {[""].concat(Object.keys(this.props.view[0]).filter(word => word !== 'id')).map(header => {
                                return <TableCell key={header}>{header}</TableCell>
                            })}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.props.view.map((obj, index) => {
                            return(
                                <TableRow key={index}>
                                    <TableCell padding="checkbox">
                                        <Checkbox
                                            checked={this.isSelected(obj['id'])}
                                            onChange={() => {this.setState({selected: this.isSelected(obj['id']) ?
                                                    this.state.selected.filter(word => word !== obj['id']) :
                                                    this.state.selected.concat([obj['id']])})}}
                                        />
                                    </TableCell>
                                    {Object.values(this.trim(obj)).map(value => {
                                        return <TableCell key={value}>{value}</TableCell>
                                    })}
                                </TableRow>
                            )
                        })}
                    </TableBody>
                    </Table>
                    <Button onClick={this.deleteSelected} variant="contained" color="primary" style={{align: "right", marginRight:"5px"}}>
                        Delete Selected
                    </Button>
                </div>
             )
        } else {
            return(<div></div>)
        }
        
    }
}

export default VehicleView
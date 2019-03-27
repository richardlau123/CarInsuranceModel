import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';
import Button from "@material-ui/core/Button";

class VehicleView extends Component{

    render(){
        if(this.props.view && this.props.view.length > 0){
            const isSelected = (obj) => this.props.selected.indexOf(obj['id']) !== -1;
            const onCheckChange = (obj) => this.props.onCheckChange(obj);
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
                                            checked={isSelected(obj)}
                                            onClick={() => onCheckChange(obj)}
                                        />
                                    </TableCell>
                                    {Object.values(this.props.trim(obj)).map(value => {
                                        return <TableCell key={value}>{value}</TableCell>
                                    })}
                                </TableRow>
                            )
                        })}
                    </TableBody>
                    </Table>
                    <Button onClick={this.props.deleteSelected} variant="contained" color="primary" style={{align: "right", marginRight:"5px"}}>
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
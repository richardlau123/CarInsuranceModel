import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

class VehicleView extends Component{


    render(){
        console.log(this.props.view)

        if(this.props.view){
            return (
                <Table>
                    <TableHead>
                        <TableRow>
                             {Object.keys(this.props.view[0]).map(header => {
                                 console.log(header)
                                 return <TableCell key={header}>{header}</TableCell>
                             })}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.props.view.map((obj, index) => {
                            return(
                                <TableRow key={index}>
                                    {Object.values(obj).map(value => {
                                        return <TableCell key={value}>{value}</TableCell>
                                    })}
                                 </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
             )
        } else {
            return(<div></div>)
        }
        
    }
}

export default VehicleView
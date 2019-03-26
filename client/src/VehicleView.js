import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

class VehicleView extends Component{

    state = {
        view: this.props.view
    }

    render(){
        return (
           <Table>
               <TableHead>
                   
               </TableHead>
           </Table>
        )
    }
}

export default VehicleView
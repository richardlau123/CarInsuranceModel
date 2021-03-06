const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const bodyparser = require('body-parser');

const app = express();

app.use(cors());
app.use(bodyparser.json());

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'carinsurance',
    database: 'carinsurance'
});

connection.connect(err => {
    if(err){
        throw err
    } else {
        console.log('Connected to MySQL server')
    }
});

app.get('/vehicle', (req, res) => {
    connection.query('SELECT * FROM vehicle', (err, result) => {
        if(err){
            return res.send(err)
        } else {
            return res.json({
                data: result
            })
        }
    })
});

app.get('/driver', (req, res) => {
    connection.query('SELECT * FROM driver', (err, result) => {
        if(err){
            return res.send(err)
        } else {
            return res.json({
                data: result
            })
        }
    })
});

//select specific vehicle with vin number
app.get('/driver/select/:licensenumber', (req, res) => {
    q = 'SELECT * FROM driver where licensenumber = \''+req.params['licensenumber']+'\';'
    connection.query(q, (err, result) => {
        if(err){
            return res.json(err)
        } else {
            return res.json({
                data: result
            })
        }
    })
});

//insert new driver
app.put('/driver/insert/:licensenumber/:name/:address/:PhoneNumber/:DateOfBirth', (req, res) => {

    let queryString = 'INSERT INTO Driver(LicenseNumber, Name, Address, PhoneNumber, DateOfBirth) VALUES (';
    queryString+= "'"+req.params['licensenumber']+"',";
    queryString+="'"+req.params['name']+"',";
    queryString+="'"+req.params['address']+"',";
    queryString+="'"+req.params['PhoneNumber']+"',";
    queryString+="'"+req.params['DateOfBirth']+"');";

    connection.query(queryString, (err, result) => {
        if(err){
            console.log(err);
            return res.status(400).send({error: err.sqlMessage});
        } else {
            return res.json({'success':'Driver is inserted'})
        }
    })
})

//delete driver with licensenumber 
app.delete('/driver/delete/:licensenumber', (req, res) => {
    query = `DELETE FROM driver where licensenumber = '${req.params.licensenumber}';`
    connection.query(query, (err, result) => {
        if(err){
            return res.json(err)
        } else {
            if(result){
                return res.json({'Success':'driver deleted'})
            } else {
                return res.json({'Error': 'Could not find a driver with this license number'})
            }
        
        }
    })
})




//select driver who buys all brand of car
app.get('/driver/buyallbrand', (req, res) => {
    connection.query('select d.licensenumber,d.name from driver d where not exists (select v.brand from vehicle v where not exists (select v2.brand from vehicle v2 where d.licensenumber = v2.licensenumber and v.brand=v2.brand));', (err, result) => {
        if(err){
            return res.json(err)
        } else {
            if(result.length > 0){
                return res.json(result)
            } else {
                return res.json([{'Error': 'No driver owns all brands of vehicles'}])
            }
        }
    })
});

app.get('/vehicle/select/:licenseplate', (req, res) => {

    query = `SELECT * FROM vehicle where licenseplate = '${req.params.licenseplate}';`

    connection.query(query, (err, result) => {
        if(err){
            return res.json(err)
        } else {
            if(result.length > 0){
                return res.json(result)
            } else {
                return res.json([{'Error': 'Could not find a vehicle with this license plate'}])
            }
        }
    })
})


app.get('/vehicle/projection/:model/:vin/:licenseplate/:brand/:modelyear/:licensenumber', (req, res) => {
    let paramsArray = Object.entries(req.params)
    let queryString = 'SELECT '

    for(let i = 0; i < 6; i++){
        if(paramsArray[i][1] == 'true'){
            queryString += `${paramsArray[i][0]},`
        }
    }

    queryString = queryString.substring(0, queryString.length - 1).concat(' FROM vehicle;')

    connection.query(queryString, (err, result) => {
        if(err){
            return res.json([{'Error': 'Select at least one column'}])
        } else {
            return res.json(result)
        }
    })
})

//join vehicle and driver
app.get('/vehicleanddriver', (req, res) => {
    query = 'SELECT d.name,v.vin,v.modelyear,v.brand,v.model FROM vehicle v,driver d where v.licensenumber=d.licensenumber';

    connection.query(query, (err, result) => {
        if(err){
            return res.json(err)
        } else {
            if(result){
                return res.json(result)
            } else {
                return res.json([{'Error': 'query failed'}])
            }
        
        }
    })
})

app.get('/countbrand', (req, res) => {
    query = "select count(distinct brand) as 'count' from vehicle;";

    connection.query(query, (err, result) => {
        if(err){
            return res.json(err)
        } else {
            if(result){
                return res.json(result)
            } else {
                return res.json([{'Error': 'query failed'}])
            }
        
        }
    })
})

app.get('/countMultiVehicleDriver', (req, res) => {
    query = "SELECT d.name from driver d where d.licensenumber IN (SELECT v.licensenumber from vehicle v group by v.licensenumber having count(*) > 1) ;"
    
    connection.query(query, (err, result) => {
        if(err){
            return res.json(err)
        } else {
            if(result){
                return res.json(result)
            } else {
                return res.status(400).send({error: err.sqlMessage});
            }
        
        }
    })
})

//insert new vehicle
app.put('/vehicle/insert/:model/:vin/:licenseplate/:brand/:modelyear/:licensenumber', (req, res) => {
	console.log(`insert new vehicle`);
    let queryString = 'INSERT INTO Vehicle(Model, VIN, LicensePlate, Brand, ModelYear, LicenseNumber) VALUES  (';
    queryString+= "'"+req.params['model']+"',";
    queryString+="'"+req.params['vin']+"',";
    queryString+="'"+req.params['licenseplate']+"',";
    queryString+="'"+req.params['brand']+"',";
    queryString+="'"+req.params['modelyear']+"',";
    queryString+="'"+req.params['licensenumber']+"');";
    console.log(queryString);

    connection.query(queryString, (err, result) => {
        if(err){
            console.log(err);
            return res.status(400).send({error: err.sqlMessage});
        } else {
            console.log("200");
            return res.json({'success':'Vehicle is inserted'})
        }
    })
})


//delete vehicles with licenseplate =
app.delete('/vehicle/delete/:licenseplate', (req, res) => {
    query = `DELETE FROM vehicle where licenseplate = '${req.params.licenseplate}';`
	connection.query(query, (err, result) => {
        if(err){
            return res.json(err)
        } else {
            if(result){
                return res.json({'Success':'Vehicle(s) deleted'})
            } else {
                return res.json({'Error': 'Could not find a vehicle with this license plate'})
            }
        
        }
    })
});

//delete a set of vehicles by their VINs =
app.delete('/vehicle/delete', (req, res) => {
    let query = `DELETE FROM vehicle WHERE vin IN ${req.body.vins};`;
    connection.query(query, (err, result) => {
        if(err){
            return res.json(err)
        } else {
            if(result){
                return res.json({'Success':'Vehicle(s) deleted'})
            } else {
                return res.json({'Error': 'Could not find a vehicle with this license plate'})
            }

        }
    })
});

//update to a new vin
app.put('/vehicle/update/vin/:oldvin/:newvin', (req, res) => {

	let query = `UPDATE vehicle SET vin = '${req.params.newvin}' where vin = '${req.params.oldvin}';`

    connection.query(query, (err, result) => {
        if(err){
            console.log(err);
            return res.json({'Error': 'Could not find a vehicle with this license plate or licenseplate has been taken'})
        } else {
            return res.json({'success':'Vehicle is updated'})
        }
    })
})

//update to a new licenseplate
app.put('/vehicle/update/lp/:licenseplate/:newlicenseplate', (req, res) => {
    let queryString = 'update Vehicle set licenseplate = ';
    queryString+="'"+req.params['newlicenseplate']+"' where licenseplate=";
    queryString+="'"+req.params['licenseplate']+"'";

    connection.query(queryString, (err, result) => {
        if(err){
            console.log(err);
            return res.json({'Error': 'Could not find a vehicle with this license plate or licenseplate has been taken'})
        } else {
            return res.json({'success':'Vehicle is updated'})
        }
    })
})

const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`Car insurance server listening on port ${port}...`)
});

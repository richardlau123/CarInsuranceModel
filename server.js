const express = require('express');
const cors = require('cors')
const mysql = require('mysql')
const bodyparser = require('body-parser')

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

app.get('/country', (req, res) => {
    connection.query('SELECT * FROM country', (err, result) => {
        if(err){
            return res.send(err)
        } else {
            console.log(result)
            return res.json({
                data: result
            })
        }
    })
});

app.get('/vehicle', (req, res) => {
    connection.query('SELECT * FROM vehicle', (err, result) => {
        if(err){
            return res.send(err)
        } else {
            console.log(result)
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
            console.log(result)
            return res.json({
                data: result
            })
        }
    })
});

//select specific vehicle with vin number
app.get('/driver/select/:licensenumber', (req, res) => {
    q = 'SELECT * FROM driver where licensenumber = \''+req.params['licensenumber']+'\';'

    console.log(q)
    connection.query(q, (err, result) => {
        if(err){
            return res.send(err)
        } else {
            console.log(result)
            return res.json({
                data: result
            })
        }
    })
});



//select driver who buys all brand of car
app.get('/driver/buyallbrand', (req, res) => {
    connection.query('select d.licensenumber,d.name from driver d where not exists (select v.brand from vehicle v where not exists (select v2.brand from vehicle v2 where d.licensenumber = v2.licensenumber and v.brand=v2.brand));', (err, result) => {
        if(err){
            return res.send(err)
        } else {
            console.log(result)
            return res.json({
                data: result
            })
        }
    })
});

//select specific vehicle with vin number
app.get('/vehicle/select/:vin', (req, res) => {
    q = 'SELECT * FROM vehicle where vin = \''+req.params['vin']+'\';'

    console.log(q)
    connection.query(q, (err, result) => {
        if(err){
            return res.send(err)
        } else {
            console.log(result)
            return res.json({
                data: result
            })
        }
    })
});



app.post('/test/:op', (req, res) => {
    console.log(req.body, req.params)
    res.send('got a post request')
});

const port = process.env.PORT || 4000
app.listen(port, () => {
    console.log(`Car insurance server listening on port ${port}...`)
});

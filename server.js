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

app.post('/vehicle/select', (req, res) => {
  
    console.log(req.body, req.params)
    res.status(202).json("testing")
    // connection.query('SELECT * FROM country', (err, result) => {
    //     if(err){
    //         return res.send(err)
    //     } else {
    //         console.log(result)
    //         return res.json({
    //             data: result
    //         })
    //     }
    // })
});



app.post('/test', (req, res) => {
    res.send('got a post request')
});

const port = process.env.PORT || 4000
app.listen(port, () => {
    console.log(`Car insurance server listening on port ${port}...`)
});

const express = require('express');
const cors = require('cors')
const mysql = require('mysql')

const app = express();

app.use(cors());

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'carinsurance',
    database: 'world'
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
            return res.json({
                data: result
            })
        }
    })
});



app.post('/test', (req, res) => {
    res.send('got a post request')
});

const port = process.env.PORT || 4000
app.listen(port, () => {
    console.log(`Car insurance server listening on port ${port}...`)
});

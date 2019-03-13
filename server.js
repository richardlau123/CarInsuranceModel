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
        console.log(err)
    } else {
        console.log('Connected to MySQL server')
    }
});

const port = 4000

app.listen(port, () => {
    console.log(`Car insurance server listening on port ${port}`)
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



app.get('/api/customers', (req, res) => {
  const customers = [
    {id: 1, firstName: 'John', lastName: 'Doe'},
    {id: 2, firstName: 'Brad', lastName: 'Traversy'},
    {id: 3, firstName: 'Mary', lastName: 'Swanson'},
  ];

  res.json(customers);
});


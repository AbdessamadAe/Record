const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'pass',
    database: 'recorddb',
});

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());


app.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    
    const sqlSelect = "SELECT * FROM login WHERE email = ? and password = ?";
    db.query(sqlSelect, [email, password], (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
        if (result.length > 0) {
            res.send(result);
            console.log(result);
        }
        else {
            res.send({message: "Wrong email/password combination!"});
        }
        }});
});

app.listen(3001, () => {
    console.log('Server is running on port 3001');
});
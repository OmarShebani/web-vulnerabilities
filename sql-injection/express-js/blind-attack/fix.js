const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'sql_injection',
});

connection.connect(function(err) {
    if (err) {
        console.error('Error connecting to the database: ', err.message);
        return;
    }
    console.log('Connected to the database successfully!');
});

app.get(['/', '/login.html', '/login'], function (req, res) {
    res.sendFile(__dirname + '/login.html');
});

app.post('/login', function (req, res) {
    const username = req.body.username;
    const password = req.body.password;

    const sql = 'SELECT username, password FROM users WHERE username = ?';
    connection.execute(sql, [username],function (err, results) {
        if (err) {
            console.error('Error sending the query to the database: ' + err.message);
            res.sendFile(__dirname + '/login.html');

        } else if (results.length > 0 && results[0].password === password) {
            res.send(`<h3>Mission Complete :D</h3>
                      <a href=/login>Back</a>`);
      
        } else {
            res.send(`<h3>Login Failed</h3>
                      <a href=/login>Back</a>`);
        }
    });
});

app.listen(3000, function () {
    console.log(`Server running at http://localhost:3000`);
});
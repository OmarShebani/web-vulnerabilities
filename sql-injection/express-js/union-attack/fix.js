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

app.get(['/', '/search-user.html', '/search-user'], function (req, res) {
    res.sendFile(__dirname + '/search-user.html');
});

app.post('/search', function (req, res) {
    const username = req.body['search-user'];

    const sql = 'SELECT username, bio FROM users WHERE username = ?';
    connection.execute(sql, [username], function (err, results) {
        if (err) {
            console.error('Error sending the query to the database: ', err.message);
            res.sendFile(__dirname + '/search-user.html');

        } else if (results.length > 0) {
            let responseHtml = '';
            results.forEach(row => {
                const {username, bio} = row;
                responseHtml += `<h3>Username: ${username}</h3>
                                 <h4>Bio: ${bio}</h4>`;
            });

            responseHtml += "<a href=/search-user>Back</a>";
            res.send(responseHtml);
            
        } else {
            res.send(`<h3>🤔 We couldn't find anything matching your search. Maybe try using different keywords or check your spelling?</h3>
                      <a href=/search-user>Back</a>`);
        }
    });
});

app.listen(3000, function () {
    console.log(`Server running at http://localhost:3000`);
});
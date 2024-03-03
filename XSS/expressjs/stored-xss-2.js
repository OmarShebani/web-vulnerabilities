const express = require('express');
const app = express();

app.use(express.urlencoded({ extended: true }));

app.get('/', function (req, res) {
    hackerInput = '<script>alert("Hi")</script>';
    const htmlResponse = `<h2>Comments:</h2> <br>
                          <h4>Author: Hacker</h4> <br>
                          <p>${hackerInput}<p>`;         // This was stored when another user, which is the hacker,
    res.send(htmlResponse);                              // entered this malicious script in the comments section,
});                                                      // it was stored in the server then sent to another user

app.listen(3000, function () {
  console.log('Server is running on http://localhost:3000');
});
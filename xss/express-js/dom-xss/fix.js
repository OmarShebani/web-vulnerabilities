const express = require('express');
const app = express();

app.use(express.urlencoded({ extended: true }));

app.get('/', function (req, res) {
    const htmlResponse = `<h2>Search for your item here:</h2> <br>
                          <form action="/search" method="get">
                              <input type="text" name="searchItem">
                              <button type="submit">Search</button>
                          </form>`;
    res.send(htmlResponse);
});

app.get('/search', function (req, res) {
    const item = req.query.searchItem;
    const htmlResponse = `<h2>Search results for: <div id="item"></div> </h2>
                          <form action="/search" method="get">
                              <input type="text" name="searchItem">
                              <button type="submit">Search</button>
                          </form>
                          <script>
                              document.getElementById('item').textContext = "${item}";
                          </script>`;
    res.send(htmlResponse);
});

app.listen(3000, function () {
  console.log('Server is running on http://localhost:3000');
});
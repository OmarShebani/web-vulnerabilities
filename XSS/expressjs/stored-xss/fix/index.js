const express = require('express');
const fs = require('fs');
const app = express();

app.use(express.urlencoded({ extended: true }));

const filePath = 'comments.csv';

function readFile() {
  const data = fs.readFileSync(filePath, 'utf8');
  const splitData = data.split('\n')
                        .slice(0,-1)
                        .map((item) => item.split('&'));
  return splitData;
}

function storeComment(author, comment) {
  const data = `${encodeURIComponent(author)}&${encodeURIComponent(comment)}\n`;
  
  fs.appendFile(filePath, data, 'utf8', (err) => {
    if (err) {
      console.error('Error storing comment:', err);
    } else {
      console.log('Comment has been stored successfully.');
    }
  });
}

app.get(['/', '/comments'], function (req, res) {
  const comments = readFile();

  const htmlResponse = `<h2>Comments:</h2>
                      <div id="comments-section"></div> <br>                    
                      <script>
                          const parentElement = document.getElementById('comments-section');
                          const comments = ${JSON.stringify(comments)};
                          if (comments) {
                            comments.forEach((item) => {
                              const author = decodeURIComponent(item[0]);
                              const comment = decodeURIComponent(item[1]);

                              parentElement.insertAdjacentHTML('beforeend', '<h4>Author: ' + author + '</h4>');
                              parentElement.insertAdjacentHTML('beforeend', '<p>' + comment + '</p>');
                            });
                          }
                      </script>
                      <h3>Post A Comment Here:</h3> <br>
                      <form action="/post-comment" method="POST">
                          <input required="" type="text" name="comment" placeholder="Type Your Comment Here..."> <br><br>
                          <input required="" type="text" name="author" placeholder="Type Your Username Here..."> <br><br>
                          <button type="submit">Post Comment</button>
                      </form>`;         
  res.send(htmlResponse);
});

app.post('/post-comment', function (req, res) {
  storeComment(req.body.author, req.body.comment);
  res.redirect('/comments');
});

app.listen(3000, function () {
  console.log('Server is running on http://localhost:3000');
});
const express = require('express');
const fs = require('fs');
const app = express();

app.use(express.urlencoded({ extended: true }));

const filePath = "email.csv";

function getData() {
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        return data.split('&');
    } catch (err) {
        console.error('An error occurred while getting an email:\n\n', err);
        return null;
    }
}

function changeEmail(email) {
    const data = `${email.replace(/&/g, '%26')}&${getData()[1]}`;
    fs.writeFile(filePath, data, 'utf8', (err) => {
        if (err) {
          console.error('An error occurred while storing an email:', err);
        } else {
          console.log('Email has been stored successfully.');
        }
    });
}

function generateCsrfToken() {          // Creates and stores the csrf token
    try {
        let token = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 21; i++) {
            token += characters.charAt(Math.floor(Math.random() * characters.length));
        }

        const data = `${getData()[0]}&${token}`;
        fs.writeFileSync(filePath, data, 'utf8');
        return token;
    } catch (err) {
        console.error('An error occurred while generating and storing csrf token:\n\n', err);
        return null;
    }
}

app.get(['/', '/account-settings'], function (req, res) {
    const email = getData()[0].replace(/%26/g, '&');
    const csrfToken = generateCsrfToken();

    if (email && csrfToken) {
        const htmlResponse = `<h2>Your Email Address:</h2>
                              <h4>${email}</h4>
                              <h3>Change your email here:</h3>
                              <form action="/account-settings/change-email" method="post">
                                  <input type="email" name="email" placeholder="New Email Address" required>
                                  <input type="hidden" name="csrfToken" value="${csrfToken}">                 
                                  <button type="submit">Confirm</button>
                              </form>`;                                                         // Added a csrf token here 
        res.send(htmlResponse);
    } else {
        res.status(500).send("Internal Server Error");
    }
});

app.post('/account-settings/change-email', function (req, res) {
    if (req.body.csrfToken === getData()[1]) {
        changeEmail(req.body.email);
        res.redirect('/account-settings');
    } else {
        res.status(403).send("Access Denied");
    }
});

app.listen(3000, function () {
  console.log('Server is running on http://localhost:3000');
});
const express = require('express');
const { exec } = require('child_process');
const app = express();

app.use(express.urlencoded({ extended: true }));

function isValidIP(ip) {
    const ipRegex = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    return ipRegex.test(ip);
}

app.get('/', (req, res) => {
    res.send(`
        <h2>Ping a server:</h2>
        <form action="/ping" method="POST">
            <input type="text" name="ip" placeholder="Enter IP address">
            <button type="submit">Ping</button>
        </form>
    `);
});

app.post('/ping', (req, res) => {
    const ip = req.body.ip;

    if (!isValidIP(ip)) {
        return res.send("Invalid IP address");
    }

    exec(`ping -c 4 ${ip}`, (error, stdout, stderr) => {
        if (error) {
            res.send(`<pre>Error: ${stderr}</pre>`);
        } else {
            res.send(`<pre>${stdout}</pre>`);
        }
    });
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});

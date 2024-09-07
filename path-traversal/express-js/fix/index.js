const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();

app.get(['/', '/Wallpapers'], function (req, res) {
    res.sendFile(path.join(__dirname, 'wallpapers.html'));
});

app.get('/image', (req, res) => {
    const filename = req.query.filename;

    // Sanitize the input by only allowing specific extensions and checking the base directory
    const sanitizedFilename = path.basename(filename);
    const safePath = path.join(__dirname, '../../images', sanitizedFilename);

    if (!fs.existsSync(safePath) || path.extname(safePath) !== '.jpeg') {
        res.status(404).send('Image not found');
        return;
    }

    fs.readFile(safePath, (err, data) => {
        if (err) {
            res.status(404).send('Image not found');
            return;
        }
        res.contentType('image/jpeg');
        res.send(data);
    });
});

app.listen(3000, () => {
    console.log('Server running at http://localhost:3000');
});
var express = require('express');
var app = express();
var fs = require('fs');

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.get('/image', (req, res) => {
    fs.readdir(__dirname+ '/images', (err, files) => {
        if (err) throw err;
        let randomFileIndex = Math.floor(Math.random()*files.length)
        res.sendFile(__dirname + '/images/' + files[randomFileIndex]);
    });
});

app.listen(10000, () => {
    console.log('Listening on port 10000');
});
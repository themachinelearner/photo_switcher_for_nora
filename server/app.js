var express = require('express');
var app = express();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.get('/image', (req, res) => {
    res.sendFile(__dirname + '/images/10425156_10101783917532015_8637296692260815835_n.jpg');
});

app.listen(10000, () => {
    console.log('Listening on port 10000');
});
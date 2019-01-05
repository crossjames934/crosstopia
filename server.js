// Dependencies imported
const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

// Cities
let cities = [];

// Use (JS, CSS) files in Public folder
app.use(express.static('public'));

// Send index.html
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/views/index.html');
});

// Generates a random ID that will be used to identify the user, useful in case of duplicate names
app.get('/getID', function (req, res) {
    res.send(shortid.generate());
});

// User creates a city / hosts a game
app.post('/createCity/:cityDetails', function(req, res) {
    const cityDetails = JSON.parse(req.params.cityDetails);
    for (let i = 0; i < cities.length; i++) {
        if (cities[i].name === cityDetails.name) {
            return res.send(false)
        }
    }
    res.send(true);
});

// Manage socket connections
io.on('connection', function (socket) {
    console.log('a user connected');

    // Disconnection
    socket.on('disconnect', function () {
        console.log('a user disconnected');
    });

    // Messages
    socket.on('chat message', function (msg) {
        io.emit('chat message', msg);
    });

});

http.listen(process.env.PORT, function () {
    console.log('Your app is listening on port ' + http.address().port);
});

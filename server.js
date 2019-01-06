// Dependencies imported
const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const shortid = require('shortid');
const bcrypt = require('bcryptjs');
const cryptr = require('cryptr');

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
        if (cities[i].name.toLowerCase() === cityDetails.name.toLowerCase()) {
            return res.send(false)
        }
    }
    // No clashes with existing cities - push city to the main array and let the fun begin!
    cityDetails.players = [];
    cityDetails.id = shortid.generate();
    cities.push(cityDetails);
    res.send(true);
});

// Find city to join - sends back id of city if password is correct
app.get('/findCity/:cityDetails', function(req, res) {
    const cityDetails = JSON.parse(req.params.cityDetails);
    let output = "not found";
    for (let i = 0; i < cities.length; i++) {
        // Check if names of cities match regardless of case
        if (cityDetails.name.toLowerCase() === cities[i].name.toLowerCase()) {
            // Matching names
            if (cityDetails.password === cities[i].password) {
                output = cities[i].id;
            } else {
                output = "wrong password";
            }
            break;
        }
    }
    res.send(output);
});

app.post('/joinGame/:playerDetails', function(req, res) {
    const playerDetails = JSON.parse(req.params.playerDetails);
    let output = "city not found";
    // Find the city that the player belongs to
    for (let i = 0; i < cities.length; i++) {
        if (playerDetails.cityId === cities[i].id) {
            // Iterate through all players in that city to see if there's a matching name
            const nameTaken = "name already taken";
            for (let j = 0; j < cities[i].players.length; j++) {
                if (playerDetails.teamName.toLowerCase() === cities[i].players[j].name.toLowerCase()) {
                    output = nameTaken;
                    break;
                }
            }
            // If city was found and no other players with that name exist, add them to the game and grant access
            if (output !== nameTaken) {
                cities[i].players.push(playerDetails);
                output = "access granted";
            }
            break;
        }
    }
    res.send(output);
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

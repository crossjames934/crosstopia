const socket = io();

$(function () {
    // When user connects, the server will generate a random id for them which will be used to identify them
    $.get("/getID", function (data) {
        playerId = data;
    });

    socket.on('update list of players', function(data) {
        const parsed = JSON.parse(data);
        if (parsed.cityId === cityId) {
            listOfPlayers1.html("");
            listOfPlayers2.html("");
            for (let i = 0; i < parsed.players.length; i++) {
                listOfPlayers1.append($('<li>').text(parsed.players[i]));
                listOfPlayers2.append($('<li>').text(parsed.players[i]));
            }
        }
    });

    socket.on('start game', function(hostCityId) {
        if (cityId === hostCityId) {
            waitingForPlayersScreen.hide();
            lobbyScreen.hide();
            gameStartedScreen.show();
        }
    });

    // When message is sent by anyone, append it to the chat window
    socket.on('chat message', function (msg) {
        // const msgObject = JSON.parse(msg);
        // if (msgObject.roomId === roomNum) {
        //     $('#messages').append($('<li>').text(msgObject.msg));
        //     const container = $('#msgContainer');
        //     container.scrollTop(container[0].scrollHeight);
        // }
    });
});
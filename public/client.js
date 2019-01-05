const socket = io();

$(function () {
    // When user connects, the server will generate a random id for them which will be used to identify them
    $.get("/getID", function (data) {
        id = data;
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
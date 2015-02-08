$(function () {

    var socket = io('http://localhost:8080/');

    var keyword = '';

    // Listener for new data events
    socket.on('bubble', function (bubble) {
        showNewGraphBubble(bubble);
    });

    // Get initialization data from server
    socket.on('welcome', function (data) {
       keyword = data.keyword;
    });

});

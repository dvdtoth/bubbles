$(function () {

    var socket = io('http://localhost:8080/');

    var keyword = '';

    // Listener for new tweet events
    socket.on('tweet', function (data) {
        showNewGraphBubble(data);
    });

    // Get initialization data from server
    socket.on('welcome', function (data) {
       keyword = data.keyword;
    });

});

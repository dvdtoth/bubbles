"use strict";

var config = require('./config.js');

var io = require('socket.io')(config.io.port);
var Twit = require('twit');
var T = new Twit(config.twitter);

var natural = require('natural');

// take from command
process.argv.shift();
process.argv.shift();

var searchfor = process.argv.join(' ');

var stream = T.stream('statuses/filter', {track: searchfor});

stream.on('tweet', function (tweet) {
    io.emit('tweet', tweet);
});

io.sockets.on('connection', function (socket) {
    console.log("Client connected");

    io.emit('welcome', {keyword: searchfor});

//  socket.on('message', function () { });
    socket.on('disconnect', function () {
        console.log('Client disconnected');
    });
});

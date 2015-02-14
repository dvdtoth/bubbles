"use strict";

var config = require('./config.js');

var io = require('socket.io')(config.io.port);
var Twit = require('twit');
var T = new Twit(config.twitter);

var Processor = require('./processor')

// Command line arguments
var searchfor = process.argv[2];
var mood = process.argv[3] || undefined;

var stream = T.stream('statuses/filter', {track: searchfor});

var dataProcessor = new Processor();

stream.on('tweet', function (tweet) {
    dataProcessor.processData('twitter', tweet, mood);
});

dataProcessor.on('result', function(bubble) {
    console.log(bubble.source);
    console.log(bubble.data.text);
    console.log(bubble.result);
    io.emit('bubble', bubble);
})

io.sockets.on('connection', function (socket) {
    console.log("Client connected");

    io.emit('welcome', {keyword: searchfor});

//  socket.on('message', function () { });
    socket.on('disconnect', function () {
        console.log('Client disconnected');
    });
});
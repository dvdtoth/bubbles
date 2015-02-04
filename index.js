"use strict";

var Twit = require('twit');
var io = require('socket.io')(8080);
var config = require('./config.js');
var T = new Twit(config.twitter);

var stream = T.stream('statuses/filter', {track: 'superbowl'});

stream.on('tweet', function (tweet) {
    console.log(tweet.user.name);
    console.log(tweet.text);
    //console.log(tweet.user.location);

    io.emit('tweet', tweet);
    //console.log(tweet);
});

io.sockets.on('connection', function (socket) {
    console.log("Client connected");
//  socket.on('message', function () { });
    socket.on('disconnect', function () {
        console.log('Client disconnected');
    });
});

"use strict";

var Twit = require('twit');
var io = require('socket.io')(8080);
var config = require('./config.js');
var T = new Twit(config.twitter);

// take from command
process.argv.shift();
process.argv.shift();

var searchfor = process.argv.join(' ');

//console.log(searchfor);
var stream = T.stream('statuses/filter', {track: searchfor});

stream.on('tweet', function (tweet) {
    //console.log(tweet.user.name);
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

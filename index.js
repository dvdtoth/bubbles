"use strict";

var config = require('./config.js');

var io = require('socket.io')(config.io.port);
var Twit = require('twit');
var T = new Twit(config.twitter);

var sentiment = require('./processing/sentiment.js');

// take from command
process.argv.shift();
process.argv.shift();

var searchfor = process.argv.join(' ');

// @TODO Add learner stream
//var learner = T.stream('statuses/filter', {track: word});

var stream = T.stream('statuses/filter', {track: searchfor});

stream.on('tweet', function (tweet) {
    console.log(tweet.text);
    sentiment.NaiveBayes(tweet.text);
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

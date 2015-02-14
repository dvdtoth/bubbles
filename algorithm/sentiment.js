"use strict"

var natural = require('natural');

function Sentiment() {
    this.sensation = new natural.BayesClassifier();
}

Sentiment.prototype.Learn = function(data, mood) {

    // Add some test data
    this.sensation.addDocument(data, mood)

    this.sensation.train();

    this.sensation.save('mood.json', function (err, sensation) {
        // Add some test data
        //this.sensation.addDocument(data, mood)
        //
        //this.sensation.train();
    });
}

Sentiment.prototype.Classify = function(data) {

            //natural.BayesClassifier.load('mood.json', null, function (err, sensation) {
            //    return sensation.classify(data);
            //});


    return this.sensation.classify(data);
}


module.exports = Sentiment;
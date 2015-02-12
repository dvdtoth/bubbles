"use strict"

var natural = require('natural');

function Sentiment() {
    this.sensation = new natural.BayesClassifier();
}

Sentiment.prototype.Learn = function() {

    // Add some test data
    this.sensation.addDocument('happy birthday', 'positive')
    this.sensation.addDocument('terribly sorry', 'negative')
    this.sensation.addDocument('amazingly well', 'positive')
    this.sensation.addDocument('awful destruction', 'negative')
    this.sensation.addDocument('wonderful suprise', 'positive')
    this.sensation.addDocument('deadly war', 'negative')
    this.sensation.addDocument('make money', 'positive')
    this.sensation.addDocument('terrible pain', 'negative')
    this.sensation.addDocument('sad sickness', 'negative')

    this.sensation.train();
}

Sentiment.prototype.Classify = function(data) {

    return this.sensation.classify(data);
}


module.exports = Sentiment;
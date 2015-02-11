"use strict"

var natural = require('natural');

var Sentiment = {};

Sentiment.NaiveBayes = function(data) {

    var sensation = new natural.BayesClassifier();

    // Add some test data
    sensation.addDocument('happy birthday', 'positive')
    sensation.addDocument('terribly sorry', 'negative')
    sensation.addDocument('amazingly well', 'positive')
    sensation.addDocument('awful destruction', 'negative')
    sensation.addDocument('wonderful suprise', 'positive')
    sensation.addDocument('deadly war', 'negative')
    sensation.addDocument('make money', 'positive')
    sensation.addDocument('terrible pain', 'negative')
    sensation.addDocument('sad sickness', 'negative')

    sensation.train();

    return sensation.classify(data);
}


module.exports = Sentiment;
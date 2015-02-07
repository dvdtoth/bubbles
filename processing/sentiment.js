"use strict"

var natural = require('natural');

var sentiment = {};

sentiment.NaiveBayes = function(data) {

    var sensation = new natural.BayesClassifier();

    // Add some test data
    sensation.addDocument('happy birthday', 'positive')
    sensation.addDocument('terribly sorry', 'negative')
    sensation.addDocument('amazingly well', 'positive')
    sensation.addDocument('awful destruction', 'negative')
    sensation.addDocument('wonderful suprise', 'positive')
    sensation.addDocument('deadly war', 'negative')

    sensation.train();

    console.log(sensation.classify(data));
}


module.exports = sentiment;
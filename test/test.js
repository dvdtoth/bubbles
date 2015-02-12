"use strict"

var should = require('should'),
    ioc = require('socket.io-client'),
    Processor = require('../processor'),
    Sentiment = require('../algorithm/sentiment');


describe("Data processor", function () {

    var processor = new Processor;
    var source = Math.random().toString(36).substring(7);
    var data = {};
    data.text = 'testing data';

    var procResult = {};

    processor.on('result', function (result) {
        procResult = result;
    })

    processor.processData(source, data);

    it('should have the right properties', function () {

        procResult.should.have.property('source', source);
        procResult.result.should.not.be.empty;

    });

    it('should return the original object with the result', function () {

        procResult.data.text.should.equal(data.text);

    });

});

describe("Sentiment analyzer", function () {

    var sentiment = new Sentiment;

    it('should guess the right sentiment on basic trigger words', function () {

        sentiment.Learn();

        var happy = sentiment.Classify('happy');
        var sad = sentiment.Classify('sad');

        happy.should.be.exactly('positive');
        sad.should.be.exactly('negative');
    });
})
"use strict"

var Sentiment = require('./algorithm/sentiment')

var events = require('events'),
    util = require('util');

function Processor() {
    events.EventEmitter.call(this);
    this.sentiment = new Sentiment;
    this.sentiment.Learn();
}

util.inherits(Processor, events.EventEmitter);

Processor.prototype.processData = function (source, data, callback) {

    var molecule = {};

    molecule.source = source;
    molecule.data = data;
    molecule.result = this.sentiment.Classify(data.text);

    this.emit('result', molecule);
};


module.exports = Processor;
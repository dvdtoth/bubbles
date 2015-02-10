"use strict"

var should = require('should'),
    ioc = require('socket.io-client'),
    Processor = require('../processor')


describe("The data processor", function () {

    var processor = new Processor;
    var source = Math.random().toString(36).substring(7);
    var data = {};
    data.text = 'testing data';

    var procResult = {};

    processor.on('result', function (result) {
        procResult = result;
    })

    processor.processData(source, data);

    it('should have the right properties', function() {

        procResult.should.have.property('source', source);
        procResult.should.have.property('result', 'positive' || 'negative');

    });

    it('should return the original object with the result', function () {

        procResult.data.text.should.equal(data.text);

    });

})
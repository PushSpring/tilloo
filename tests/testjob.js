#! /usr/bin/env node
'use strict';

var async = require('async');
var commander = require('commander');

commander.version('0.0.1')
    .usage('<sleepInSeconds>')
    .parse(process.argv);

var sleepSeconds = parseInt(commander.args[0]);
var iterations = 0;
var sleepIntervalInSeconds = 5;

console.info('Working %d seconds', sleepSeconds);
async.doWhilst(function(done) {
    console.info('Doing work seconds: ' + iterations);
    setTimeout(done, sleepIntervalInSeconds * 1000);
}, function() {
    iterations += sleepIntervalInSeconds;
    return iterations < sleepSeconds;
}, function(err) {
    console.info('done');
});
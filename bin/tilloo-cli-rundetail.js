#! /usr/bin/env node
'use strict';

var mongoose = require('mongoose');
var commander = require('commander');

var config = require('../lib/config');
var Run = require('../models/run');

mongoose.connect(config.db);
mongoose.Promise = global.Promise;

commander.version('0.0.1')
    .usage('<runId>', 'Id of run')
    .parse(process.argv);

if(commander.args.length !== 1) {
    commander.help();
    process.exit(1);
}

Run.findByRunId(commander.args[0], function(err, run) {
    if(err) {
        console.error('Error getting job detail err: ' + err);
        process.exit(1);
    }
    else {
        console.info(JSON.stringify(run, null, 4));
        process.exit(0);
    }

});

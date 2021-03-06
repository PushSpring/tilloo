var mongoose = require('mongoose');

var Log = new mongoose.Schema({
    runId: { type: mongoose.Schema.ObjectId, required: true, index: true},
    output: {type: String, required: true},
    createdAt: {type: Date, default: function() { return new Date();}}
});

Log.pre('save', function(done) {
    if(!this.createdAt)
    {
        this.createdAt = new Date();
    }
    return done();
});

Log.statics.append = function append(runId, output, createdAt, callback) {
    new model({runId: runId, output: output, createdAt: createdAt}).save(function(err) {
        if(err) {
            console.error(err);
        }

        callback(err);
    });
};

Log.statics.findOutputForRun = function outputForRun(runId, callback) {
    model.find({runId: new mongoose.Types.ObjectId(runId)}, 'output', {sort: {createdAt: 1}}, callback);
};

Log.statics.deleteOutputForRun = function deleteOutputForRun(runId, callback) {
    model.remove({runId: new mongoose.Types.ObjectId(runId)}, callback);
};

var model = mongoose.model('log', Log);
module.exports = model;
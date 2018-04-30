var moongoose = require('./mongo');
var autoIncrement = require('mongoose-auto-increment');

var Schema = moongoose.Schema;

var Task = new Schema
({
    taskId : Number,
    name : String,
    description : String,
    createdDateTime : Date,
    lastUpdatedDateTime : Date,
    totalTime : Number
});

Task.plugin(autoIncrement.plugin, {model : 'Task', field : 'taskId', startAt : 1});

module.exports = moongoose.model('Task', Task);
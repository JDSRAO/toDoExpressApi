var moongoose = require('./mongo');
var autoIncrement = require('mongoose-auto-increment');

var Schema = moongoose.Schema;

var ToDo = new Schema({
    todoId : Number,
    title : String,
    description : String,
    done : Boolean,
    dueDate : Date,
    status : String,
    createdDateTime : Date
});

ToDo.plugin(autoIncrement.plugin, {model : 'ToDo', field : 'todoId', startAt : 1});

module.exports = moongoose.model('ToDo', ToDo);
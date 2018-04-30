var express = require('express');
var router = express.Router();
var toDo = require('../models/toDo');

/* GET home page. */
router.get('/', function(req, res, next) {
  //res.render('index', { title: 'Express' });
  res.json({'tasks': 'list of all tasks'});
});


router.get('/addToDo', function(req, res, next) {
  var toDoLocal = new toDo({
    title : req.body.title,
    description : req.body.description
  });

  toDoLocal.save(function(err,result) {
    if(err)
    {
      return res.status(500).json({
        title : 'An error occurred',
        error : err
      });
    }
    res.status(201).json({
      contact : 'Saved Coontact',
      obj : result
    });
  });
});

module.exports = router;

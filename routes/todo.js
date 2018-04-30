var express = require('express');
var router = express.Router();
var toDo = require('../models/toDo');
var verifyToken = require('../auth/verifyToken');

  // get all todo
  router.get('/items', verifyToken, function(req, res, next) {
    //res.render('index', { title: 'Express' });
    var path = require('path');
    var userName = process.env['USERPROFILE'].split(path.sep)[2];
    var loginId = path.join("domainName",userName);

    toDo.find(function (err, todoData) {
      if(err)
      {
        res.status(500).json({
          message : 'Error occurred',
          obj : err
        });
      } 

      res.status(201).json({
        message : 'Saved Coontact',
        obj : todoData
      });

    }).sort({createdDateTime : -1 });

    
  });

  // get single item
  router.put('/item/:id', function(req, res, next) {
    var id = req.params.id;
    var query = {"todoId" : id};
    console.log(query);
    toDo.findOne(query, function (err, todoData) {
      if(err)
      {
        res.status(500).json({
          message : 'Error occurred',
          obj : err
        });
      }
      res.status(201).json({
        message : 'Fatched Coontact',
        obj : todoData
      });

    });
    
  });

  // add to do
  router.post('/add', function(req, res, next) {
    var toDoLocal = new toDo({
      title : req.body.title,
      description : req.body.description,
      status : req.body.status,
      done : req.body.done,
      dueDate : req.body.dueDate,
      createdDateTime : new Date()
    });
  
    toDoLocal.save(function(err,result) {
      if(err)
      {
        return res.status(500).json({
          message : 'An error occurred',
          error : err
        });
      }
      res.status(201).json({
        message : 'Saved Coontact',
        obj : result
      });
    });
  });

  router.delete('/delete/:id',function (req, res, next) {
    var id = req.params.id;
    var query = {"todoId" : id};
    console.log(query);
    toDo.deleteOne(query,function (err, result) {
      if(err)
      {
        console.log(err);
        return res.status(500).json(
          {
            message:'An error occurred',
            error: err
          }
        );
      }

      res.status(201).json({
        message : 'Deleted Successfully',
        obj : result
      });

    });
  });

  router.post('/update',function (req, res, next) {
    var query = {"todoId" : req.body.todoId};
    var toDoLocal = new toDo
    ({
      title : req.body.title,
      description : req.body.description,
      status : req.body.status,
      done : req.body.done,
      dueDate : req.body.dueDate
    });
    console.log(req.body);
    console.log(toDoLocal);
    toDo.update(query, req.body, function (err, result) 
    {
      if(err)
      {
        console.log(err);
        return res.status(500).json(
          {
            message:'An error occurred',
            error: err
          }
        );
      }

      res.status(201).json({
        message : 'updated Successfully',
        obj : result
      });
    });

  });
  
  module.exports = router;
var Hapi = require('hapi');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/test');
var db = mongoose.connection;

var taskSchema = mongoose.Schema({
        task: String,
        owner: String,
        index: Number
});

var Task = mongoose.model('Task', taskSchema)

var server = new Hapi.Server();
server.connection({ port: 8080  });

server.route([
  {
    method: 'GET',
    path: '/',
    handler: function(request,reply) {
      reply("Hello World from Hapi");
    }
  },
  {
    method: 'GET',
    path: '/api/v1/todolist',
    handler: function(request,reply) {
      var result = Task.find().sort({index:-1}).limit(10);
      result.exec(function(err, tasks){
        reply(tasks);
      });
    }
  },
  {
    method: 'POST',
    path: '/api/v1/todolist',
    handler: function(request,reply) {
      newTask = {"task":request.payload.task, "owner":request.payload.owner};
      todolist.push(newTask);
      reply(todolist).code(201);
    }
  },
  {
    method: 'GET',
    path: '/api/v1/todolist/{index}',
    handler: function(request,reply) {
      var result = Task.findOne({"index":request.params.index});
      result.exec(function(err, task){
        if(task){
          reply(task);
        }else{
          reply().code(404);
        }
        
      })      
    }
  },
  {
    method: 'PUT',
    path: '/api/v1/todolist/{index}',
    handler: function(request,reply) {
      newTask = {"task":request.payload.task, "owner":request.payload.owner};
      todolist[request.params.index-1] = newTask
      reply(todolist[request.params.index-1]);
    }
  },
  {
    method: 'DELETE',
    path: '/api/v1/todolist/{index}',
    handler: function(request,reply) {
      Task.findOneAndRemove({index:request.params.index}, function(){
        reply().code(204);
      });      
    }
  }
])

server.start(function(err){
  console.log("Hapi is listening on localhost:8080");
});
var Hapi = require('hapi');

// Create the data store for the test API
var todolist = [
  {
      "task": "Walk the cat",
      "owner": "Kirsten"
  },
  {
      "task": "Water the plants",
      "owner": "Kirsten"
  }
]

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
      reply(todolist);
    }
  },
  {
    method: 'POST',
    path: '/api/v1/todolist',
    handler: function(request,reply) {
      newTask = {"task":requst.payload.task, "owner":requst.payload.owner};
      todolist.push(newTask);
      reply(todolist).code(201);
    }
  },
  {
    method: 'GET',
    path: '/api/v1/todolist/{index}',
    handler: function(request,reply) {
      reply(todolist[request.params.index-1]);
    }
  },
  {
    method: 'PUT',
    path: '/api/v1/todolist/{index}',
    handler: function(request,reply) {
      newTask = {"task":requst.payload.task, "owner":requst.payload.owner};
      todolist[request.params.index-1] = newTask
      reply(todolist[request.params.index-1]);
    }
  },
  {
    method: 'DELETE',
    path: '/api/v1/todolist/{index}',
    handler: function(request,reply) {
      delete todolist[request.params.index-1];
      reply().code(204);
    }
  }
])

server.start(function(err){
  console.log("Hapi is listening on localhost:8080");
});
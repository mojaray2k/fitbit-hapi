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
    method: 'GET',
    path: '/api/v1/todolist/{index}',
    handler: function(request,reply) {
      reply(todolist[request.params.index-1]);
    }
  }
])

server.start(function(err){
  console.log("Hapi is listening on localhost:8080");
});
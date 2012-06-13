var server = require("./server.js");
var router = require("./router.js");
var requestHandlers = require("./requesthandlers.js");

var handle = {};

handle["/"] = requestHandlers.start;
handle["/start"] = requestHandlers.start;
handle["/upload"] = requestHandlers.upload;
handle["/display"] = requestHandlers.display;
handle["/save"] = requestHandlers.save;

server.start(router.route, handle);
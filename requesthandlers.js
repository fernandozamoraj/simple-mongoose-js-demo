var mongoose = require('mongoose');
var Schema = mongoose.Schema;

function start(response){

	response.writeHead(200, {"Content-Type" : "text/plain"});
	console.log("Request handler 'start' was called.");
    response.write("Request handler 'start' was called.");
    response.end();
   
}

function upload(response){

   response.writeHead(200, {"Content-Type" : "text/plain"});
   console.log("Request handler 'upload' was called.");
   response.write("Request handler 'upload' was called.");
   response.end();
}

function save(response){

   response.writeHead(200, {"Content-Type" : "text/plain"});
   response.write("\r\nConnecting to mongodb://localhost/my_database");
   mongoose.connect('mongodb://localhost/my_database');
   
   response.write("\r\nCreating Todo Schema");
   var Todo = new Schema({
       dateEntered  : {type: Date, default: Date.now},
       key          : String,
       item         : String,
	   description  : String,
   });
   
   var TodoModel = mongoose.model('Todo', Todo);
   
   var myItem = new TodoModel();
   myItem.key = "0001";
   myItem.item = "Clean Kitchen";
   myItem.description = "Clean kitchen, wash dishes and sweep floor";
   
   myItem.save(function(err){
       
       if(err)
       {
         console.log("An error occured");
    	 console.log(err);
         response.write("An error occured while trying to save the data");
       }
       else
       response.write("Data was successfully saved");
 
       console.log("Entered saved method");
    
   });

   mongoose.disconnect();
   response.write("\r\nDisconnected from database");

   response.end();
}

function display(response){

   	response.writeHead(200, {"Content-Type" : "text/html"});
 
    console.log("Entered the display method");
   
   var connection = mongoose.connect('mongodb://localhost/my_database');
   console.log("Called mongoose.connect");
   
   //I don't know why I have to define the schem each time.
   //I defined it here and in the save function.
   //I will research the solution later.
   var Todo = new Schema({
       key          : String,
       dateEntered  : {type: Date, default: Date.now},
       item         : String,
	   description  : String
   });
   
   var TodoModel = mongoose.model('Todo', Todo);
   var todoItem;

   TodoModel.findOne({ key : '0001'}, function(err, todo){
      if(err)
	     console.log(error);
	  else
        console.log(todo);
      
      todoItem = todo;  
      console.log("key: " + todo.key);  
      console.log("dateEntered" + todo.dateEntered);
      console.log("item" + todo.item);
      console.log("description" + todo.description);
      mongoose.disconnect();
    
      writeDataToScreen(todoItem, response);
      response.end();
   });
}

function writeDataToScreen(todoItem, response){
    
    response.write("\r\n<html><head><title>Display Todo</title></head>");
    response.write("\r\n    <body>");
    response.write("\r\n        <h3>Key</h3>" + todoItem.key);
    response.write("\r\n        <h3>Date Entered</h3>" + todoItem.dateEntered);
    response.write("\r\n        <h3>Item</h3>" + todoItem.item);
    response.write("\r\n        <h3>Description</h3>" + todoItem.description);
    response.write("\r\n    </body>");
    response.write("\r\n</html>");
}

exports.start = start;
exports.upload = upload;
exports.save = save;
exports.display = display;

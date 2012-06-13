var mongoose = require('mongoose');
var Schema = mongoose.Schema;

function start(){
   console.log("Request handler 'start' was called.");
}

function upload(){
   console.log("Request handler 'upload' was called.");
}

function save(){
   mongoose.connect('mongodb://localhost/my_database');
   
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
       
      console.log("An error occured");
	  console.log(err);
      console.log("Entered saved method");
   });

   mongoose.disconnect();
}

function display(){
    console.log("Entered the display method");
   
   var connection = mongoose.connect('mongodb://localhost/my_database');
   console.log("Called mongoose.connect");
   
   //I don't know why I have to define the schem each time.
   //I defined it here and in the save function.
   //I will research the solution later.
   var Todo = new Schema({
       dateEntered  : {type: Date, default: Date.now},
       item         : String,
	   description  : String,
   });
   
   var TodoModel = mongoose.model('Todo', Todo);
   
   TodoModel.findOne({ key : '0001'}, function(err, todo){
      if(err)
	     console.log(error);
	  else
        console.log(todo);
        
      console.log("key: " + todo.key);  
      console.log("dateEntered" + todo.dateEntered);
      console.log("item" + todo.item);
      console.log("description" + todo.description);
      mongoose.disconnect();
   });
}

exports.start = start;
exports.upload = upload;
exports.save = save;
exports.display = display;

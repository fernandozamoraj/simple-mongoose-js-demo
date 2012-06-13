var mongoose = require('mongoose');

function start(){
   console.log("Request handler 'start' was called.");
}

function upload(){
   console.log("Request handler 'upload' was called.");
}

function save(){
   
   console.log("Entered the save method");
   
   mongoose.connect('mongodb://localhost/my_database');
   
   var Todo = new Schema({
       item         : String,
	   description  : String,
   });
   
   var TodoModel = mongoose.model('Todo', Todo);
   
   var myItem = new TodoModel();
   myItem.my.key = "fernando";
   myItem.item = "Clean Kitchen";
   myItem.description = "Clean kitchen, wash dishes and sweep floor";
   
   myItem.save(function(err){
      console.log("An error occured");
	  console.log(err);
   });
}

function display(){
   console.log("Request handler 'display' was called");
}

exports.start = start;
exports.upload = upload;
exports.save = save;
exports.display = display;

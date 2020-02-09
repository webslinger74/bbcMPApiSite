var express = require('express');
var apiMocker = require('connect-api-mocker');
 
var app = express();
 
app.use('/api', apiMocker('mock-api'));
 
app.listen(9000,  (error)=> {
    if(error){
        console.log(error);
    }  else {
       console.log("server runnning")
   }});

   



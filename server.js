var path = require("path");
var files = null;
var process = require("process");
var child_process = require('child_process');
var path   =   require("path");
var fs    =  require("fs");
var http  =  require("http");
var express  =  require("express");
var app  =  express();
var cpuUsage = null;
var usage = require('usage');

var pid = process.pid 
usage.lookup(pid, function(err, result) {
  cpuUsage =  result; 
});


var configSettings = process.env;

app.use(express.static(__dirname + ''));

app.get('/', function (req, res) {

  res.sendFile('index.html', {root:__dirname});

});

var cmd = "ls -R > filelist.txt";
child_process.exec(cmd, (error, stdout, stderr) => {
  if (error) {
   console.log(error);
  }else {
    console.log(stdout);
  }
})
app.get('/files', function (req, res) {
  fs.readFile('filelist.txt', function(err, data) { 
   res.send(data);
 })
})

app.get('/sysinfo',function(req, res){

  var cmd = "cat /proc/cpuinfo > cpuinfo.txt";

  child_process.exec(cmd, (error, stdout, stderr) => {
   if (error) {
    console.log(error);
   }else {
    console.log(stdout);
   }
  })
  
  fs.readFile('cpuinfo.txt', function (err, data) {
   res.send(data);
  })

 });

app.listen(3000);
console.log("listening on port 3000");


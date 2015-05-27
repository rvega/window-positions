#! /usr/bin/node

// Libraries
var shell = require('child_process');
var fs = require('fs');

// Config variables
var window_set_geometry_command = 'wmctrl -r "{1}" -e "{2}"';

// Global state variables
var windows_info = [];
var params = {
   input_filename : 'windows.json'
};

function parse_parameters(){
  if(typeof(process.argv[2]) != 'undefined'){
     params.input_filename = process.argv[2];
  }
}

function set_windows_info(){
   windows_info.forEach(function(window){
      var geometry = '0,' + (window.x-6*4) + ',' + (window.y-24-6*5-2) + ',' + window.w + ',' + window.h;
      var command = window_set_geometry_command.replace('{1}', window.title).replace('{2}',geometry);
      console.log(command);
      shell.exec(command, function(err, stdout, stderr){
         // nothing.      
      });
   });
}

function read_file(){
   try{
      windows_info = JSON.parse(fs.readFileSync(params.input_filename));
   }
   catch(e){
      console.error(e.message);
   }
}

parse_parameters();
read_file();
set_windows_info();

#! /usr/bin/node

// Libraries
var shell = require('child_process');
var fs = require('fs');

// Config variables
var window_list_command = 'wmctrl -lpG';

// Global state variables
var windows_info = [];
var params = {
   input_filename : 'windows.json'
};

function print(a){
   var s = JSON.stringify(a, null, "\t");
   fs.writeFileSync(params.input_filename, s); 
}

function get_window_info(window){
   window = window.split(' ');
   window = window.filter(function(n){ return n; });

   var info = {};
   info.wid = window[0];
   info.workspace = window[1];
   info.pid = window[2];
   info.x = window[3];
   info.y = window[4];
   info.w = window[5];
   info.h = window[6];
   info.title = window.splice(8, window.length).join(' ');

   return info;
}

function set_windows_info(){
   shell.exec(window_list_command, function(err, stdout, stderr){
      if(err){
         console.error(err);
         return;
      }
      var windows = stdout.split('\n');
      var window_count = windows.length;
      var infos = [];
      windows.forEach(function(window){
         if(window != ''){
            var info = get_window_info(window);
            infos.push(info);
         }

         window_count--;
         if(window_count <= 0){
            print(infos);
         }
      });
   });
}

function parse_parameters(){
  if(typeof(process.argv[2]) != 'undefined'){
     params.input_filename = process.argv[2];
  }
}

function read_file(){
   fs.readFileSync();
}

parse_parameters();
read_file();
set_windows_info();

#! /usr/bin/env node

// Libraries
var shell = require('child_process');
var fs = require('fs');

// Config variables
var window_list_command = 'wmctrl -lpG';

// Global state variables
var windows_info = [];
var params = {
   output_filename : 'windows.json'
};

function print(a){
   var s = JSON.stringify(a, null, "\t");
   fs.writeFileSync(params.output_filename, s); 
}

function get_window_info(window){
   if(window == '') return false;

   window = window.split(' ');
   window = window.filter(function(n){ return n; }); // Get rid of extra whitespace within the split array

   var info = {};
   info.wid = window[0];
   info.workspace = Number(window[1]);
   info.pid = Number(window[2]);
   info.x = Number(window[3]);
   info.y = Number(window[4]);
   info.w = Number(window[5]);
   info.h = Number(window[6]);
   info.title = window.splice(8, window.length).join(' ');

   if(info.workspace == -1) return false; // This is the Desktop

   return info;
}

function get_windows_info(){
   shell.exec(window_list_command, function(err, stdout, stderr){
      if(err){
         console.error(err);
         return;
      }
      var windows = stdout.split('\n');
      var window_count = windows.length;
      var infos = [];
      windows.forEach(function(window){
         var info = get_window_info(window);
         if(info){
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
     params.output_filename = process.argv[2];
  }
}

parse_parameters();
get_windows_info();

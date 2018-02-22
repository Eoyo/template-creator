#!/usr/bin/env node

var path = require('path');
var openBrowser = require('react-dev-utils/openBrowser');

// if (openBrowser('http://localhost:3000')) {
//   console.log('The browser tab has been opened!');
// }


// 获取到输入的参数;
const argv = process.argv.slice(2);
console.log(argv);


switch (argv[0]) {
  case 'install' :
  console.log('install');
}
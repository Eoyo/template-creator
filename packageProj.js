#!/usr/bin/env node

var map = require('map-stream');
var vfs = require('vinyl-fs');
const path = require('path');

var log = function (file, cb) {
    console.log(file.path);
    cb(null, file);
};

const pwd = process.cwd();

const from = process.argv[2] || '.';
const to = process.argv[3] || './output';
const src = [from + '/**/*', '!./**/node_modules'];

console.log('当前的路径： \t' + pwd);
console.log('拷贝源： \t' + src[0], '\n过滤条件: \t' + src[1]);
console.log('目标地点： \t' + to);
vfs.src(src)
    .pipe(map(log))
    .pipe(vfs.dest(to))
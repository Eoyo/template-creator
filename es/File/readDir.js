var fs = require('fs');
var path = require('path'); //解析需要遍历的文件夹
var filePath = path.resolve('./');
console.log(process.cwd());

console.log(filePath);
//调用文件遍历方法
fileDisplay(filePath);
//文件遍历方法
function fileDisplay(filePath) {
  //根据文件路径读取文件，返回文件列表
  fs.readdir(filePath, function(err, files) {
    if (err) {
      console.warn(err);
    } else {
      //遍历读取到的文件列表
      files.forEach(function(filename) {
        //获取当前文件的绝对路径
        var filedir = path.join(filePath, filename);
        //根据文件路径获取文件信息，返回一个fs.Stats对象
        fs.stat(filedir, function(eror, stats) {});
      });
    }
  });
}

// var cheerio = require('cheerio');
// var iconv = require('iconv-lite');
// var myHtml = fs.readFileSync('index.html');
// var myHtml2 = iconv.decode(myHtml, 'gbk');
// console.log(myHtml2);

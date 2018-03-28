/**
 * Created by Administrator on 2016/8/18.
 */
'use strict';
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var mysql = require('mysql');
var jsonfile = require('jsonfile');
var cookiePraser = require('cookie-parser');

const homeController = require('./public/controller/HomeController');
var fs = require('fs');
var config = require('./config.js');
var multer = require('multer'); // 文件上传
var upload = multer({dest: 'uploads/'}); //文件上传
var file = 'public/data/data.json';
var mongo = require('mongodb');  //使用mongodb

var conn = mysql.createConnection(config.connectionMySQL);
var puppeteer = require('puppeteer');
app.set('view engine', 'xtpl');  //因为 node_modules 中 express 是 view engin 而不是 views
app.set('views', __dirname + '/views');

app.use(cookiePraser());            // 引入cookiePraser 可以在ajax的时候通过 req.cookies 来读取cookies，可以加参数做加密，读取通过signCookies

app.use(express.static('/chat'));  //设置最初一级访问目录
app.use(homeController.router); //引导对应的视图文件到controller里面去解决

conn.query('select * from eat', function(err, rows, fields){
  console.log(rows)
});


var eventNum = 0;
fs.watch('target.txt', function(event, filename){
  eventNum++;
  console.log('Event #: '+eventNum+' : '+event+' , for file: '+filename);
});
console.log('Now watching target for changes...');

function strictAdd(x, y, callBack){
  if(x<0){
    callBack('x can not be less than 0', null);
  }else if(y<0){
    callBack('Y can not be less than 0', null);
  }else{
    callBack(null, x + y);
  }
}
fs.readFile('targ1et.txt', function(err, data){
  if(err)console.log(err.path);
  console.log(data)
});



strictAdd(1, 8, function(err, result){
  if (err)console.log(err);
  else{
    console.log(result)
  }
});
console.log('listen on 4000');
app.listen(4000);
//todo


fs.writeFile('target.txt', fs.readFile('b.txt', function (err, data) {
    return data.toString();
  }) + '223', (err)=> {
  if (err)throw err;
  console.log('done3!')
});

puppeteer.launch().then(async browser => {
  const page = await browser.newPage();
  await page.goto('https://www.google.com');
  await page.screenshot({path: '/Users/junxie/Downloads/ref.png'});
  console.log('finish cut')
  await browser.close();
});
'use strict';
var serverInfo = require('../config/server_info.json');
var request = require('request');
var sign = require('./sign');
var util = require('util');
var fs = require('fs');
/**
 * @module linkin
 * @description 用户接入
 */
module.exports.linkin = function(opts,pemFilePath,callback){
  // loginName,phone,email,appKey,requsetTime,signMethod,sign
  // 获取参数
  var querystring = Object.keys(opts)
  .sort(function(a,b){
    return a > b || (a===b?0:-1);
  }).map(function(val,index){
    return val + '=' + opts[val];
  }).join('&');

  console.log(querystring);

  var signString = sign.sign(querystring,pemFilePath);
  opts['sign'] = signString;


  console.log(signString);

  // 生成跳转表单
  var htmlForm = fs.readFileSync('./redirect.html','utf8');
  var htmlFormExport = util.format(htmlForm,opts.loginName,opts.phone,opts.email,opts.appkey,opts.requsetTime,opts.sign);

  fs.writeFileSync('./redirectExport.html',htmlFormExport);
  
};




var params = {
  'loginName':'13248445203',
  'phone':'13248445203',
  'email':'huiyouxing@gmail.com',
  'appkey':'huiyouxing',
  'requsetTime': +Date.now().toString().replace(/\d{3}$/g,''),
  'signMethod':'RSA'
};

exports.linkin(params,'../config/certi/rsa_private_key_pkcs8.pem',function(err,data){
  console.log(err,data);
});
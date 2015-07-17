'use strict';
var request = require('request');
var sign = require('./sign');
var serverInfo = require('../config/server_info.json');
/**
 * @module linkin
 * @description 用户接入
 */
module.exports.linkin = function(opts,pemFilePath,callback){
  // loginName,phone,email,appKey,stime,signMethod,sign
  // 获取参数
  var querystring = Object.keys(opts)
  .sort(function(a,b){
    return a > b || (a===b?0:-1);
  }).map(function(val,index){
    return val + '=' + opts[val];
  }).join('&');

  var signString = encodeURIComponent(sign.sign(querystring,pemFilePath));  

  opts['sign'] = signString;

  console.log(opts);

  request({
    url:serverInfo.openapi.partner_v1_linkin,
    method:'POST',
    form:opts
  },function(err,reponse,body){
    console.log(body);
  });
};



var params = {
  'loginName':'loginName',
  'phone':'phone',
  'email':'email',
  'appKey':'appKey',
  'stime':'stime',
  'signMethod':'RSA'
};

exports.linkin(params,'../config/certi/rsa_private_key_pkcs8_yl.pem',function(err,data){
  console.log(err,data);
});
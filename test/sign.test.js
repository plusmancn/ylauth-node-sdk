'use strict';
var expect = require('expect.js');
var sign = require('../lib/sign.js');

/**
 * 明文
 * ```
 * appkey=yunlai&email=yunlai@gmail.com&loginName=yunlai&phone=13811112222&requsetTime=1436855651
 * ```
 */
var blankText = 'appkey=yunlai&email=yunlai@gmail.com&loginName=yunlai&phone=13811112222&requsetTime=1436855651';
var pemPrivate = './config/certi/rsa_private_key_pkcs8_yl.pem';
var pemPublic = './config/certi/rsa_public_key_yl.pem';

describe('sign',function(){

  // 签名结果
  var signResult = '';

  // 签名生成
  describe('sign#sign',function(){
    it('should return 签名字符串',function(){
      signResult = sign.sign(blankText,pemPrivate);
      expect(signResult).to.be.a('string');
    });
  });


  // 签名验证
  describe('sign#verify',function(){
    it('should return true 验证成功',function(){
      var verifyResult = sign.verify(blankText,signResult,pemPublic);
      expect(verifyResult).to.be(true);
    });
  });

});
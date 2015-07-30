'use strict';
/**
 * @module sign
 * @description 签名类
 * ## 参考资料
 * * [支付宝文档-通过openssl生成密匙](https://cshall.alipay.com/support/help_detail.htm?help_id=397433&keyword=%25C8%25E7%25BA%25CE%25C9%25FA)
 *
 * ## 使用
 * 云来的验证方式为，pkcs8格式的私钥文件，生成密匙签名，通过公钥进行签名认证，需要把公钥上传到云来平台
 */

var fs = require('fs');
var crypto = require('crypto');

/**
 * @function 'sign.sign'
 * @description 签名生成函数
 * @param {String} blankText   需要加密的明文字符串
 * @param {String} pemFilePath 密匙文件地址，云来平台传pkcs8的的私钥
 * @return {String} 
 * ```
 * // success，返回signSting
 * seL+Wd19IgMk4n9xrwTv6JSuLSDuWn8tQAj2uSRq0wgpk6DJV/OSw7QCwIbM7qxSNLeU2jSjroOOzwquuQMRrldu6RFzu30gKMXq1uNHZimKO3tuVgUU98/SaU8zkHaBYxnPNxwKc3IK07/uP4qO8IOnYd1NZVn6Vnmc1qiFUUQ=
 * ```
 */
module.exports.sign = function(blankText,pemFilePath){
  var privatekey = fs.readFileSync(pemFilePath,'utf8');
  var signer = crypto.createSign('RSA-SHA1');
  signer.update(blankText);
  return signer.sign(privatekey, 'base64');
};


/**
 * @function 'sign.verify'
 * @param  {String} blankText        明文字符串
 * @param  {String} singnatureString 签名字符串
 * @param  {String} pemFilePath      密钥文件地址，云来平台传公钥
 * @return {Boolean}
 * ```
 * // true 代表验证成功，false代表验证失败
 * // success
 * true 
 * // fail
 * false
 * ```
 */
module.exports.verify = function(blankText,singnatureString,pemFilePath){
  var publickey = fs.readFileSync(pemFilePath,'utf8');
  var verifier = crypto.createVerify('RSA-SHA1');
  verifier.update(blankText);
  return verifier.verify(publickey, singnatureString, 'base64');
};



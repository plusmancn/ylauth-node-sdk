'use strcit';
var fs = require('fs');
var crypto = require('crypto');

// 准备公私钥和数据
var privatekey = fs.readFileSync('../config/certi/rsa_private_key_pkcs8_yl.pem', 'utf8');
var publickey = fs.readFileSync('../config/certi/rsa_public_key_yl.pem', 'utf8');
var data = 'aaa';

// 用私钥签名
var signer = crypto.createSign('RSA-SHA1');
signer.update(data);
var signature = signer.sign(privatekey, 'base64');

console.log(signature);


// 用公钥验证
var verifier = crypto.createVerify('RSA-SHA1');
verifier.update(data);
var isok = verifier.verify(publickey, signature, 'base64');

console.log(isok); // true
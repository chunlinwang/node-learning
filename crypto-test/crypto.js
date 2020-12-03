const crypto = require('crypto');

// generate a hash.
const secret = 'lAPLnPiWYA';
const hash = crypto.createHmac('sha256', secret, 'utf-8').update('helloworld').digest('base64');
console.log(hash);

// generate secretKey
var buffer = new ArrayBuffer(32);
const secretKey = crypto.createSecretKey(new DataView(buffer));
console.log(secretKey);

const sign = crypto.createSign('sha256');
sign.write('some data to sign');
sign.end();
console.log(sign);

// generate key pair
const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
  modulusLength: 4096,
  //   publicKeyEncoding: {
  //     type: 'spki',
  //     format: 'pem',
  //   },
  //   privateKeyEncoding: {
  //     type: 'pkcs8',
  //     format: 'pem',
  //     cipher: 'aes-256-cbc',
  //     passphrase: secret,
  //   },
});

console.log(publicKey);
console.log(privateKey);

const signature = sign.sign(privateKey);
const verify = crypto.createVerify('SHA256');
verify.write('some data to sign');
verify.end();
console.log(verify.verify(publicKey, signature, 'hex'));

// all algorithms supported.
console.log(crypto.getHashes());

/*
 * argon2 doesn't be supported
 * const argon2 = crypto.createHmac('argon2', secret, 'utf-8').update('helloworld').digest('base64');
 */

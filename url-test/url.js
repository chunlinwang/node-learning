const { parse } = require('querystring');
const url = require('url');

let parseUrl = 'https://www.google.com/?q=node.js';
let urlObj = url.parse(parseUrl);

console.log(urlObj);

const formatedUrl = url.format(urlObj);

console.log(formatedUrl);

const urlAddress = url.resolve('https://www.google.com', 'images');

console.log(urlAddress);
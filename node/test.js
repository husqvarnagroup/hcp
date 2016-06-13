var hcp = require('./hcp');
hcp.init('./codecs');

let model = hcp.loadModel(JSON.stringify(require('C:/Repos/hcprobotics/models/AMG3-Debug.json')));
let codec = hcp.newCodec('amg3', model);

let requestBuffer = new ArrayBuffer(1024);
let requestSize = hcp.encode(codec, 'DeviceInformation.GetMowerInformation()', requestBuffer, 1024);

let responseData = '02 17 29 00 0A 08 00 07 1F 05 07 00 68 1F 00 06 33 1F 00 06 00 CE FE 8A 09 7B C4 8F 56 07 14 08 9F 7C 60 56 80 96 3B 09 00 00 00 00 A6 03 '.split(' ').map(
    (value, index) => { return parseInt(value, 16); });

let responseBuffer = new ArrayBuffer(responseData.length);
let responseView = new Uint8Array(responseBuffer);

responseData.forEach((value, index) => {
    responseView[index] = value;
});

let response = hcp.decode(codec, responseBuffer, responseData.length);

console.log(response.result);
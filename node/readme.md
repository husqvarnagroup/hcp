# HCP Node

Example

```javascript
// load the runtime
let hcp = require('./hcp');

// load codecs from disc
hcp.init('./codecs');

// print all loaded codecs
console.log(hcp.getLibraries());

// load an object model
let modelId = hcp.loadModel(JSON.stringify(require('./test.json')));

// create a codec instance
let codecId = hcp.newCodec(hcp.getLibraries()[0], modelId);

// create buffer to hold output data
let writeBuffer = new ArrayBuffer(1024);
let bytesWritten = hcp.encode(codecId, 'DeviceInformation.GetMowerInformation()', writeBuffer);

console.log('Wrote ' + bytesWritten + ' bytes to buffer.');

let dataBuffer = Buffer.from('02 17 29 00 0A 0D 05 08 1F 0A 07 00 69 1F 00 06 33 1F 01 06 00 00 00 00 00 00 00 00 00 0A 14 08 C4 C3 66 57 38 86 AC 09 00 00 00 00 64 03 '.split(' '));
// cast the buffer into an array buffer
let readBuffer = new ArrayBuffer(dataBuffer.length);
let view = new Uint8Array(readBuffer);

for (let i = 0; i < readBuffer.length; ++i) {
    view[i] = dataBuffer[i];
}

// decode the bytes within read buffer
let result = hcp.decode(codecId, readBuffer, dataBuffer.length);

console.log(result);
```
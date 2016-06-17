'use strict';
const HcpNode_1 = require('./HcpNode');
const tif_test_1 = require('./tif-test');
const stream_relay_1 = require('./stream-relay');
/*
const fs = require('fs');
const TifCompiler = require('./tif-compiler');
fs.writeFile("tif-test.ts", TifCompiler(require('./tif-test.json')));
*/
let hcp = new HcpNode_1.HcpNode();
let serialPort = new stream_relay_1.SerialPortRelay();
let model = null;
serialPort.on('error', (error) => {
    console.error('Serial port: ' + JSON.stringify(error));
});
hcp.init('./codecs')
    .then(() => {
    model = hcp.loadModel(require('./tif-test.json'));
    return serialPort.init("COM5", 5000);
})
    .then((relay) => {
    hcp.addRelay(relay);
    return serialPort.createCodecContext();
})
    .then((context) => {
    let codec = hcp.createCodec('amg3', model, context);
    return tif_test_1.DeviceInformation.GetMmiInformation({
        codec: codec,
        timeout: 5000,
    });
})
    .then((result) => {
    console.log('MMIBoardProdTime: ' + result.MMIBoardProdTime);
})
    .catch((error) => {
    console.warn(error);
});
//# sourceMappingURL=index.js.map
'use strict';

import {HcpNode} from './HcpNode';
import {HcpCodec} from './hcp-codec';
import {DeviceInformation} from './tif-test';
import {SerialPortRelay} from './stream-relay';
/*
const fs = require('fs');
const TifCompiler = require('./tif-compiler');
fs.writeFile("tif-test.ts", TifCompiler(require('./tif-test.json')));
*/
let hcp = new HcpNode();
let serialPort = new SerialPortRelay();
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
//.then((context) => {
    //return serialPort.createCodecContext();
//})
.then((context) => {
    let codec = hcp.createCodec('amg3', model, context);   
    
    return DeviceInformation.GetMmiInformation({
        codec : codec,
        timeout : 5000,

    })
})
.then((result) => {
    console.log('MMIBoardProdTime: ' + result.MMIBoardProdTime);
})
.catch((error) => {
    console.warn(error);
});



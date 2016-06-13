var hcp = require('./hcp');
hcp.init('./codecs');

var testParams = [
            {
                name: "l",
                type: "ascii",
                length: "8",
                value: '"Cake Pie"'
            },
            {
                name : "a",
                type: "uint8",
                value : "255"
            },
            {
                name: "b",
                type: "sint8",
                value: "127"
            },
            {
                name: "c",
                type: "uint16",
                value: "1"
            },
            {
                name: "d",
                type: "sint16",
                value: "2"
            },
            {
                name: "e",
                type: "uint32",
                value: "3"
            },
            {
                name: "f",
                type: "sint32",
                value: "4"
            },
             {
                 name: "g",
                 type: "uint64",
                 value: "5"
             },
            {
                name: "h",
                type: "sint64",
                value: "6"
            }
];

var model = hcp.loadModel(JSON.stringify({
    methods: [
        {
            command: 'pong',
            family: 'ping',
            inParams: testParams,
            outParams: testParams,
            protocol: []
        }
    ]
}));

var codec = hcp.newCodec(hcp.getLibraries()[0], model);
console.log('codec: ' + codec + ' heap: ' + hcp.heapSize());

var outputBuffer = new ArrayBuffer(1024);

var request = testParams.reduce((prev, curr, index, arr) => {
    if (index < arr.length - 1) {
        return prev + curr.name + ':' + curr.value + ',';
    }

    return prev + curr.name + ':' + curr.value + ')';
}, 'ping.pong(');

console.log(request);

var outputBufferSize = hcp.encode(codec, request, outputBuffer);
console.log(JSON.stringify(hcp.decode(codec, outputBuffer, outputBufferSize)));




// clean up
hcp.closeCodec(codec);
console.log('heap: ' + hcp.heapSize());


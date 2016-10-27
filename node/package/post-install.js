const fs = require('fs');
const request = require('request');

if(!fs.existsSync('./release/lib/bin')) {
    fs.mkdirSync('./release/lib/bin');
}


if(!fs.existsSync('./release/lib/bin/x64')) {
    fs.mkdirSync('./release/lib/bin/x64');
}

request(
    'https://github.com/husqvarnagroup/hcp/raw/master/node/package/lib/bin/x64/hcp.node', (error, res, body) => {

        if(error || res.statusCode != 200) {
            throw new Error('Failed to download hcp binaries.');
        }

        if(fs.existsSync('./release/lib/bin/x64/hcp.node')) {
            fs.unlinkSync('./release/lib/bin/x64/hcp.node');
        }

        fs.writeFileSync('./release/lib/bin/x64/hcp.node', body);
    }
)
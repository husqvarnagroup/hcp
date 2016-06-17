"use strict";
class HcpLog {
    constructor() {
    }
    error(error, source, file) {
        console.error(file + ':' + source + ' - ', JSON.stringify(error));
    }
    info(message, source, file) {
        console.info(file + ':' + source + ' - ' + message);
    }
    warn(message, source, file) {
        console.warn(file + ':' + source + ' - ' + message);
    }
}
exports.HcpLog = HcpLog;
//# sourceMappingURL=hcp-log.js.map
export class HcpLog {
    constructor() {

    }

    error(error : any, source : string, file : string) : void {
        console.error(file + ':' + source + ' - ' + JSON.stringify(error));
    }

    info(message : string, source : string, file : string) : void {
        console.info(file + ':' + source + ' - ' + message);
    }

    warn(message : string, source : string, file : string) : void {
        console.warn(file + ':' + source + ' - ' + message);
    }
}
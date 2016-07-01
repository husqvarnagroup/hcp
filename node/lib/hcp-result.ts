export interface HcpResult {
    bytesWritten: number;
    result: {
        method: {
            command: string,
            family: string,
            deviceError : number,
            error : number
        },
        outParams : any
    };    
}
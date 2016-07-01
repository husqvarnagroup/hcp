import {TifRequest} from './tif-request';
import {PendingRequest} from './pending-request';

export type ResponseRouter = (data: ArrayBuffer, size: number, context: any) => Promise<any>;
export type RequestRouter = (request: TifRequest, timeout: number) => Promise<PendingRequest>;
import { RPCErrorInterface } from './RPCErrorInterface';

export interface RPCResponseInterface {
    id: string | number | null;
    jsonrpc: string,
    result?: any,
    error?: RPCErrorInterface,
}
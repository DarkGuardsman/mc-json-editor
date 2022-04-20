import {setupServer, SetupServerApi} from 'msw/node';

let server: SetupServerApi;

export function startServer() {
    server = setupServer();
    return server;
}

export function getServer() {
    return server;
}
import socketIOClient, { Socket } from "socket.io-client";
let socket: any = undefined;
export function getSocket(): Socket {
    const ENDPOINT = "https://tenshi-backend.herokuapp.com";
    // const ENDPOINT = "http://localhost:8081";
    if (socket && socket.connected) return socket;
    socket = socketIOClient(ENDPOINT);
    return socket;
}
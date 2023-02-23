import { io } from 'socket.io-client';

export const socket = localStorage.getItem("user_token") ? io("http://192.168.1.41:3002", {
    query: {
        token: localStorage.getItem("user_token")
    }
}).connect() : null;
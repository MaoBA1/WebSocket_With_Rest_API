import { io } from 'socket.io-client';

export const socket = localStorage.getItem("user_token") ? io("http://localhost:3002", {
    query: {
        token: localStorage.getItem("user_token")
    }
}).connect() : null;
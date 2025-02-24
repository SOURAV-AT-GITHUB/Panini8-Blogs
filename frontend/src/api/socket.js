import { io } from "socket.io-client";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
var socket;

const connectSocket = (token) => {
  socket = io(BACKEND_URL, {
    auth: {
      token,
    },
  });
};

const getSocket = () => {
  if (!socket) return null;
  return socket;
};
export { connectSocket, getSocket };

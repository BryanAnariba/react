import { createContext } from "react";
import type { Socket } from "socket.io-client";

export type SocketContextInitialState = {
  socket: Socket;
  online: boolean;
};

export const SocketContext = createContext({} as SocketContextInitialState);

import { useSocket } from "../hooks/useSocket";
import { SocketContext } from "./SocketContext";

export type SocketProviderProps = {
  children: React.ReactNode;
};

export const SocketProvider = ({ children }: SocketProviderProps) => {
  const { socket, online } = useSocket("http://localhost:3500/messages");
  return (
    <SocketContext.Provider value={{ socket: socket, online: online }}>
      {children}
    </SocketContext.Provider>
  );
};

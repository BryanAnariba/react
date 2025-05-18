import { useSocket } from "../../hooks/useSocket";
import { SocketContext } from "../context/SocketContext";

export type SocketProviderProps = {
  children: React.ReactNode;
};

export const SocketProvider = ({ children }: SocketProviderProps) => {
  const { socket, online } = useSocket("http://localhost:3500/tickets");

  return (
    <SocketContext.Provider value={{ socket: socket, online: online }}>
      {children}
    </SocketContext.Provider>
  );
};

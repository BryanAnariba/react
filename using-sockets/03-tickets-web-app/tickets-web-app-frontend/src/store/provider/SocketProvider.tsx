import { SocketContext } from "../context/SocketContext";
import { useSocket } from "../hooks/useSocket";

export const SocketProvider = ({ children }: React.PropsWithChildren) => {
  const { socket, online } = useSocket(
    "http://localhost:3500/tickets-connection"
  );

  return (
    <SocketContext.Provider value={{ socket, online }}>
      {children}
    </SocketContext.Provider>
  );
};

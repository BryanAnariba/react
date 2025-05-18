import { useEffect, useMemo, useState } from "react";
import io, { Socket } from "socket.io-client";

export const useSocket = (serverConnection: string) => {

  // Si el server cambia de url vuelve a cambiar el socket
  const socket: Socket = useMemo(
    () => io(serverConnection, { transports: ["websocket"] }).connect(),
    [serverConnection]
  );

  const [online, setOnline] = useState<boolean>(false);

  useEffect(() => {
    setOnline(socket.connected);
  }, [socket]);

  useEffect(() => {
    socket.on("connect", () => {
      setOnline(true);
    });
  }, [socket]);

  useEffect(() => {
    socket.on("disconnect", () => {
      setOnline(false);
    });
  }, [socket]);

  return {
    socket,
    online,
  };
};

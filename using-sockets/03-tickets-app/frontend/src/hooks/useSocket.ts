import { useEffect, useMemo, useState } from "react";
import io, { Socket } from "socket.io-client";

export const useSocket = (
  serverUrlConnection: string
): {
  socket: Socket;
  online: boolean;
} => {
  // Si la url del socket server cambia cambia esta propiedad
  const socket: Socket = useMemo(
    () => io(serverUrlConnection, { transports: ["websocket"] }).connect(),
    [serverUrlConnection]
  );

  const [online, setOnline] = useState<boolean>(false);

  useEffect(() => {
    setOnline(true);
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

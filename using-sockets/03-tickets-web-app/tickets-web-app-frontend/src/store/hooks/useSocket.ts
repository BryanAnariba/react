import { useEffect, useMemo, useState } from "react";
import io, { Socket } from "socket.io-client";

export const useSocket = (serverUrlConnection: string) => {
  const [online, setOnline] = useState<boolean>(false);

  // Si la url del socket server cambia ejecuta esta proviedad usememo
  const socket: Socket = useMemo(
    () => io(serverUrlConnection, { transports: ["websocket"] }).connect(),
    [serverUrlConnection]
  );

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

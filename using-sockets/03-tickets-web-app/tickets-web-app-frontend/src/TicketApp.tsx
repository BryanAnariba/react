import { TicketAppRouter } from "./routers/TicketAppRouter";
import { MenuUIProvider } from "./store/provider/MenuUIProvider";
import { SocketProvider } from "./store/provider/SocketProvider";

export default function TicketApp() {
  return (
    <SocketProvider>
      <MenuUIProvider>
        <TicketAppRouter />
      </MenuUIProvider>
    </SocketProvider>
  );
}

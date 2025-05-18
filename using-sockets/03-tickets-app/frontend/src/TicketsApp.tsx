import { UiProvider } from "./store/providers/UiProvider";
import TicketsAppRouter from "./routers/TicketsAppRouter";
import { SocketProvider } from "./store/providers/SocketProvider";

export default function TicketsApp() {
  return (
    <SocketProvider>
      <UiProvider>
        <TicketsAppRouter />
      </UiProvider>
    </SocketProvider>
  );
}

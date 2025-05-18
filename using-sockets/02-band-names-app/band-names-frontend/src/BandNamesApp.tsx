import { SocketProvider } from "./context/SocketProvider";
import HomePage from "./pages/HomePage";

export default function BandNamesApp() {
  return (
    <SocketProvider>
      <HomePage />
    </SocketProvider>
  );
}

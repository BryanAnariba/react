import { createRoot } from "react-dom/client";
import TicketApp from "./TicketApp.tsx";
import "./index.css";
import '@ant-design/v5-patch-for-react-19';

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
  <TicketApp />
  // </StrictMode>,
);

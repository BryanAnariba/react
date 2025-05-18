// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import '@ant-design/v5-patch-for-react-19';
import "./index.css";
import TicketsApp from "./TicketsApp";

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
  // </StrictMode>
    <TicketsApp />
);

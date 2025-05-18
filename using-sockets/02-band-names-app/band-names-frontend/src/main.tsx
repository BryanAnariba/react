import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import BandNamesApp from "./BandNamesApp.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BandNamesApp />
  </StrictMode>
);

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import GuitarlaApp from "./GuitarlaApp";
import './index.css';

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GuitarlaApp />
  </StrictMode>
);

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import TipsCalculatorApp from "./TipsCalculatorApp";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <TipsCalculatorApp />
  </StrictMode>
);

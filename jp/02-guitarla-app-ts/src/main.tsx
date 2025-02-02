import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import GuitarlaApp from "./GuitarlaApp";
import "./index.css";

// ! not null assertion operator: confia en mi es el tipo

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GuitarlaApp />
  </StrictMode>
);

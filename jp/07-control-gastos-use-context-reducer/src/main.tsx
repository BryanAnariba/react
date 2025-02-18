import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BudgetProvider } from "./context/BudgetContext.tsx";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BudgetProvider>
      <App />
    </BudgetProvider>
  </StrictMode>
);

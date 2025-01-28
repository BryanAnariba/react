import React from "react";
import ReactDom from "react-dom/client";
import { FirstApp } from "./FirstApp";
import './index.css';
import { CounterApp } from "./CounterApp";

ReactDom.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* <FirstApp title={'"Hello i am Goku Gomez"'} subtitle="A caso con el pelo se estudia!" /> */}
    <CounterApp value={0}/>
  </React.StrictMode>
);

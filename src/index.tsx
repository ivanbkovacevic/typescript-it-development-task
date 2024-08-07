import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ContextProvider } from "./context/context";
import { ContextUIProvider } from "./context/contextUI";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ContextProvider>
      <ContextUIProvider>
        <App />
      </ContextUIProvider>
    </ContextProvider>
  </React.StrictMode>
);

reportWebVitals();

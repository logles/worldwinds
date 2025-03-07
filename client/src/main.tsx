import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// Ensure the root element exists before calling createRoot
const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error(
    "Root element not found. Make sure you have <div id='root'></div> in your index.html."
  );
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

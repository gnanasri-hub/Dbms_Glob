import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import App from "./App.jsx";
import { StudentsProvider } from "./context/StudentsContext.jsx";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import "./styles.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider>
      <StudentsProvider>
        <HashRouter>
          <App />
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 3500,
              style: { borderRadius: "14px", padding: "12px 16px", fontSize: "13px" },
            }}
          />
        </HashRouter>
      </StudentsProvider>
    </ThemeProvider>
  </React.StrictMode>,
);

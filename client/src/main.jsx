import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AuthContextProvider } from "./context/AuthContext.jsx";
import { PointsContextProvider } from "./context/PointsContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthContextProvider>
      <PointsContextProvider>
        <App />
      </PointsContextProvider>
    </AuthContextProvider>
  </StrictMode>
);

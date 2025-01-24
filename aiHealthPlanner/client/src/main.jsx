import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import "./index.css";
import App from "./App.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_OAUTH_CLIENT_ID}>
        <SnackbarProvider>
          <App />
        </SnackbarProvider>
      </GoogleOAuthProvider>
    </BrowserRouter>
  </StrictMode>
);
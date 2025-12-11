import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import { LanguageProvider } from "./context/LanguageContext";
import { MemoryProvider } from "./context/MemoryContext";
import { PersonaProvider } from "./context/PersonaContext";
import { ProjectProvider } from "./context/ProjectContext";

import "bootstrap/dist/css/bootstrap.min.css";
import "./darkmode.css";
import "./styles/global.css";
import "./styles/chatPro.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <LanguageProvider>
      <ThemeProvider>
        <AuthProvider>
          <MemoryProvider>
            <PersonaProvider>
              <ProjectProvider>
                <App />
              </ProjectProvider>
            </PersonaProvider>
          </MemoryProvider>
        </AuthProvider>
      </ThemeProvider>
    </LanguageProvider>
  </React.StrictMode>
);

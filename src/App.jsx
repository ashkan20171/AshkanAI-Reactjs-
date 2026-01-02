import { ThemeProvider, CssBaseline } from "@mui/material";
import { theme } from "./app/theme";
import { BrowserRouter } from "react-router-dom";
import Router from "./app/router";

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </ThemeProvider>
  );
}

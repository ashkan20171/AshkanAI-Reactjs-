import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#0b0f19",
      paper: "#121a2b",
    },
    primary: {
      main: "#6ea8fe",
    },
    text: {
      primary: "#e7eaf0",
      secondary: "#9aa4b2",
    },
  },
  shape: { borderRadius: 14 },
  typography: {
    fontFamily: "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial",
  },
});

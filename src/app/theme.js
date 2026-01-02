import { createTheme } from "@mui/material/styles";

export const makeTheme = (mode = "dark", direction = "rtl") =>
  createTheme({
    direction,
    palette: {
      mode,
      background: {
        default: mode === "dark" ? "#070A12" : "#F6F7FB",
        paper: mode === "dark" ? "rgba(255,255,255,0.06)" : "#FFFFFF",
      },
      primary: { main: "#6EA8FE" },
      text: {
        primary: mode === "dark" ? "#EAF0FF" : "#101828",
        secondary: mode === "dark" ? "#9AA4B2" : "#475467",
      },
    },
    shape: { borderRadius: 16 },
    typography: {
      fontFamily:
        direction === "rtl"
          ? "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial"
          : "Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial",
    },
    components: {
      MuiPaper: {
        styleOverrides: {
          root: {
            backdropFilter: "blur(14px)",
          },
        },
      },
      MuiButton: {
        defaultProps: { disableElevation: true },
      },
    },
  });

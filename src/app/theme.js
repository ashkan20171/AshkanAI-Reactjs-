import { createTheme } from "@mui/material/styles";

const defaultSettings = {
  fontSize: 15,        // px
  density: "comfort",  // comfort | compact
  glass: 0.06,         // opacity for paper background in dark mode
};

export const makeTheme = (mode = "dark", direction = "rtl", settings = defaultSettings) => {
  const s = { ...defaultSettings, ...(settings || {}) };

  const paperBg =
    mode === "dark"
      ? `rgba(255,255,255,${s.glass})`
      : "#FFFFFF";

  const paperBorder =
    mode === "dark"
      ? "1px solid rgba(255,255,255,0.10)"
      : "1px solid rgba(16,24,40,0.08)";

  return createTheme({
    direction,
    palette: {
      mode,
      background: {
        default: mode === "dark" ? "#070A12" : "#F6F7FB",
        paper: paperBg,
      },
      primary: { main: "#6EA8FE" },
      text: {
        primary: mode === "dark" ? "#EAF0FF" : "#101828",
        secondary: mode === "dark" ? "#9AA4B2" : "#475467",
      },
    },
    shape: { borderRadius: 16 },
    typography: {
      fontSize: s.fontSize,
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
            border: paperBorder,
          },
        },
      },
      MuiButton: {
        defaultProps: { disableElevation: true },
        styleOverrides: {
          root: {
            paddingBlock: s.density === "compact" ? 6 : 10,
          },
        },
      },
      MuiTextField: {
        defaultProps: {
          size: s.density === "compact" ? "small" : "medium",
        },
      },
      MuiIconButton: {
        styleOverrides: {
          root: {
            padding: s.density === "compact" ? 6 : 8,
          },
        },
      },
      MuiListItemButton: {
        styleOverrides: {
          root: {
            paddingTop: s.density === "compact" ? 6 : 10,
            paddingBottom: s.density === "compact" ? 6 : 10,
          },
        },
      },
    },
  });
};

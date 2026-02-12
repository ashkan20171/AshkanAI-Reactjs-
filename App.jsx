import { CssBaseline, ThemeProvider } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import Router from "./app/router";
import { makeTheme } from "./app/theme";
import { useMemo, useEffect } from "react";
import { useUiStore } from "./app/uiStore";
import { SnackbarProvider } from "notistack";
import "./i18n";
import i18n from "./i18n";
import { useSettingsStore } from "./store/settingsStore";

export default function App() {
  const mode = useUiStore((s) => s.mode);
  const lang = useUiStore((s) => s.lang);
  const direction = useUiStore((s) => s.direction());

  const settings = useSettingsStore((s) => ({
    fontSize: s.fontSize,
    density: s.density,
    glass: s.glass,
  }));

  useEffect(() => {
    i18n.changeLanguage(lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = direction;
  }, [lang, direction]);

  const theme = useMemo(
    () => makeTheme(mode, direction, settings),
    [mode, direction, settings.fontSize, settings.density, settings.glass]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SnackbarProvider maxSnack={3} autoHideDuration={2200}>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

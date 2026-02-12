import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Select,
  FormControl,
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import MenuIcon from "@mui/icons-material/Menu";
import { Link as RouterLink } from "react-router-dom";
import { useUiStore } from "../../app/uiStore";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import SettingsDialog from "../settings/SettingsDialog";

export default function Header({ onOpenSidebar }) {
  const { t } = useTranslation();

  const mode = useUiStore((s) => s.mode);
  const setMode = useUiStore((s) => s.setMode);
  const lang = useUiStore((s) => s.lang);
  const setLang = useUiStore((s) => s.setLang);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const [settingsOpen, setSettingsOpen] = useState(false);
  const [model, setModel] = useState("general"); // demo

  return (
    <>
      <AppBar
        position="static"
        elevation={0}
        sx={{
          bgcolor: "rgba(0,0,0,0)",
          borderBottom: "1px solid rgba(255,255,255,0.10)",
          backdropFilter: "blur(12px)",
        }}
      >
        <Toolbar sx={{ gap: 2 }}>
          {/* Mobile: open sidebar */}
          <IconButton
            onClick={onOpenSidebar}
            sx={{ display: { xs: "inline-flex", md: "none" } }}
          >
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" fontWeight={900} sx={{ letterSpacing: 0.2 }}>
            {t("appName")}
          </Typography>

          <FormControl
            size="small"
            sx={{ minWidth: 170, display: { xs: "none", sm: "block" } }}
          >
            <Select
              value={model}
              onChange={(e) => setModel(e.target.value)}
              sx={{ bgcolor: "rgba(255,255,255,0.06)" }}
            >
              <MenuItem value="general">General</MenuItem>
              <MenuItem value="code">Code</MenuItem>
              <MenuItem value="creative">Creative</MenuItem>
            </Select>
          </FormControl>

          <Box sx={{ flex: 1 }} />

          <Button
            component={RouterLink}
            to="/pricing"
            variant="text"
            sx={{ display: { xs: "none", sm: "inline-flex" } }}
          >
            {t("pricing")}
          </Button>

          <Button
            component={RouterLink}
            to="/login"
            variant="contained"
            sx={{ display: { xs: "none", sm: "inline-flex" } }}
          >
            {t("login")}
          </Button>

          <Tooltip title={t("theme")}>
            <IconButton onClick={() => setMode(mode === "dark" ? "light" : "dark")}>
              {mode === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
            </IconButton>
          </Tooltip>

          <Tooltip title={t("settings")}>
            <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
              <SettingsIcon />
            </IconButton>
          </Tooltip>

          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={() => setAnchorEl(null)}
          >
            <MenuItem
              onClick={() => {
                setLang(lang === "fa" ? "en" : "fa");
                setAnchorEl(null);
              }}
            >
              {t("language")}: {lang === "fa" ? "FA" : "EN"}
            </MenuItem>

            <MenuItem
              onClick={() => {
                setMode(mode === "dark" ? "light" : "dark");
                setAnchorEl(null);
              }}
            >
              {t("theme")}: {mode === "dark" ? t("dark") : t("light")}
            </MenuItem>

            <MenuItem
              onClick={() => {
                setAnchorEl(null);
                setSettingsOpen(true);
              }}
            >
              {t("settings")}
            </MenuItem>

            {/* موبایل: لینک‌ها */}
            <MenuItem
              onClick={() => {
                setAnchorEl(null);
                window.location.href = "/pricing";
              }}
              sx={{ display: { xs: "flex", sm: "none" } }}
            >
              {t("pricing")}
            </MenuItem>

            <MenuItem
              onClick={() => {
                setAnchorEl(null);
                window.location.href = "/login";
              }}
              sx={{ display: { xs: "flex", sm: "none" } }}
            >
              {t("login")}
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      <SettingsDialog open={settingsOpen} onClose={() => setSettingsOpen(false)} />
    </>
  );
}

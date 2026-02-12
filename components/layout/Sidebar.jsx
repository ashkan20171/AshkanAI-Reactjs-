import {
  Box,
  Button,
  Divider,
  List,
  ListItemButton,
  ListItemText,
  Typography,
  Chip,
  LinearProgress,
  Drawer,
  IconButton,
  Menu,
  MenuItem,
  TextField,
  Tooltip,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import CloseIcon from "@mui/icons-material/Close";
import PushPinIcon from "@mui/icons-material/PushPin";
import DownloadIcon from "@mui/icons-material/Download";
import { useAuthStore } from "../../store/authStore";
import { useChatStore } from "../../store/chatStore";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSnackbar } from "notistack";

function SidebarInner({ onClose }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const plan = useAuthStore((s) => s.plan);
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  const usage = useAuthStore((s) => s.usage);
  const limits = useAuthStore((s) => s.limits());

  const activeId = useChatStore((s) => s.activeId);
  const setActive = useChatStore((s) => s.setActive);
  const newChat = useChatStore((s) => s.newChat);
  const renameChat = useChatStore((s) => s.renameChat);
  const deleteChat = useChatStore((s) => s.deleteChat);
  const search = useChatStore((s) => s.search);

  const pinToggle = useChatStore((s) => s.pinToggle);
  const exportConversation = useChatStore((s) => s.exportConversation);

  const total = limits.messagesPerDay;
  const used = usage.messagesToday;
  const pct = Math.min(100, Math.round((used / total) * 100));

  const [q, setQ] = useState("");
  const chats = search(q);

  const [menuAnchor, setMenuAnchor] = useState(null);
  const [menuChatId, setMenuChatId] = useState(null);

  // Ctrl+K / Cmd+K -> focus search
  useEffect(() => {
    const onKeyDown = (e) => {
      const isMac = navigator.platform.toLowerCase().includes("mac");
      const mod = isMac ? e.metaKey : e.ctrlKey;

      if (mod && e.key.toLowerCase() === "k") {
        e.preventDefault();
        const el = document.getElementById("sidebar-chat-search");
        el?.focus();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const openMenu = (e, id) => {
    e.stopPropagation();
    setMenuAnchor(e.currentTarget);
    setMenuChatId(id);
  };

  const closeMenu = () => {
    setMenuAnchor(null);
    setMenuChatId(null);
  };

  const doRename = () => {
    const title = prompt(t("rename"));
    if (title && menuChatId) renameChat(menuChatId, title.trim());
    closeMenu();
  };

  const doDelete = () => {
    if (menuChatId) deleteChat(menuChatId);
    closeMenu();
  };

  const doPin = () => {
    if (menuChatId) pinToggle(menuChatId);
    closeMenu();
  };

  const download = (content, filename, type) => {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  const doExportTxt = () => {
    if (!menuChatId) return;
    const content = exportConversation(menuChatId, "txt");
    if (!content) return;
    download(content, "ashkan-ai-chat.txt", "text/plain;charset=utf-8");
    enqueueSnackbar("Export TXT", { variant: "success" });
    closeMenu();
  };

  const doExportJson = () => {
    if (!menuChatId) return;
    const content = exportConversation(menuChatId, "json");
    if (!content) return;
    download(content, "ashkan-ai-chat.json", "application/json;charset=utf-8");
    enqueueSnackbar("Export JSON", { variant: "success" });
    closeMenu();
  };

  return (
    <Box
      sx={{
        width: 300,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        bgcolor: "background.paper",
        borderRight: "1px solid rgba(255,255,255,0.10)",
      }}
    >
      <Box sx={{ p: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Button
            fullWidth
            variant="outlined"
            startIcon={<AddIcon />}
            sx={{
              justifyContent: "flex-start",
              borderColor: "rgba(255,255,255,0.16)",
              py: 1.2,
            }}
            onClick={() => {
              newChat();
              onClose?.();
            }}
          >
            {t("newChat")}
          </Button>

          {onClose ? (
            <IconButton onClick={onClose}>
              <CloseIcon />
            </IconButton>
          ) : null}
        </Box>

        <Box sx={{ mt: 2, display: "flex", gap: 1, alignItems: "center", flexWrap: "wrap" }}>
          <Chip size="small" label={user ? user.name : "Guest"} />
          <Chip size="small" variant="outlined" label={plan.toUpperCase()} />
        </Box>

        <Box sx={{ mt: 2 }}>
          <Typography variant="caption" color="text.secondary">
            {used}/{total}
          </Typography>
          <LinearProgress
            variant="determinate"
            value={pct}
            sx={{ mt: 1, height: 8, borderRadius: 999 }}
          />
        </Box>

        <Box sx={{ mt: 2, display: "flex", gap: 1 }}>
          <Button size="small" variant="text" onClick={() => navigate("/pricing")}>
            {t("pricing")}
          </Button>

          {user ? (
            <Button size="small" variant="text" onClick={logout}>
              {t("logout")}
            </Button>
          ) : (
            <Button size="small" variant="text" onClick={() => navigate("/login")}>
              {t("login")}
            </Button>
          )}
        </Box>

        <TextField
          size="small"
          fullWidth
          placeholder="Search chats…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          inputProps={{ id: "sidebar-chat-search" }}
          sx={{ mt: 2 }}
        />
      </Box>

      <Divider />

      <Box sx={{ p: 1, flex: 1, overflow: "auto" }}>
        <Typography variant="caption" color="text.secondary" sx={{ px: 1 }}>
          {t("chats")}
        </Typography>

        <List dense>
          {chats.map((c) => (
            <ListItemButton
              key={c.id}
              selected={c.id === activeId}
              onClick={() => {
                setActive(c.id);
                onClose?.();
              }}
              sx={{ borderRadius: 2, mx: 1, my: 0.5 }}
            >
              <ListItemText primary={c.title} primaryTypographyProps={{ noWrap: true }} />

              {c.pinned ? (
                <Tooltip title="Pinned">
                  <PushPinIcon fontSize="small" sx={{ opacity: 0.85, mx: 0.5 }} />
                </Tooltip>
              ) : null}

              <Tooltip title="More">
                <IconButton size="small" onClick={(e) => openMenu(e, c.id)}>
                  <MoreHorizIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </ListItemButton>
          ))}
        </List>
      </Box>

      <Menu anchorEl={menuAnchor} open={Boolean(menuAnchor)} onClose={closeMenu}>
        <MenuItem onClick={doPin}>
          <PushPinIcon fontSize="small" style={{ marginInlineEnd: 8 }} />
          Pin / Unpin
        </MenuItem>

        <MenuItem onClick={doRename}>{t("rename")}</MenuItem>
        <MenuItem onClick={doDelete}>{t("delete")}</MenuItem>

        <Divider />

        <MenuItem onClick={doExportTxt}>
          <DownloadIcon fontSize="small" style={{ marginInlineEnd: 8 }} />
          Export TXT
        </MenuItem>
        <MenuItem onClick={doExportJson}>
          <DownloadIcon fontSize="small" style={{ marginInlineEnd: 8 }} />
          Export JSON
        </MenuItem>
      </Menu>

      <Divider />

      <Box sx={{ p: 2 }}>
        <Typography variant="body2" fontWeight={900}>
          Ashkan AI
        </Typography>
        <Typography variant="caption" color="text.secondary">
          Premium UI • Conversations • i18n
        </Typography>
      </Box>
    </Box>
  );
}

export default function Sidebar({ variant, open, onClose }) {
  if (variant === "mobile") {
    return (
      <Drawer
        open={Boolean(open)}
        onClose={onClose}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": { width: 300 },
        }}
      >
        <SidebarInner onClose={onClose} />
      </Drawer>
    );
  }

  return (
    <Box sx={{ display: { xs: "none", md: "block" }, height: "100%" }}>
      <SidebarInner />
    </Box>
  );
}

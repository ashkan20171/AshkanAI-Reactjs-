import { Box, Container, Typography, IconButton, Tooltip, Button, Paper } from "@mui/material";
import { useMemo, useRef, useEffect, useState } from "react";
import MessageBubble from "./MessageBubble";
import ChatInput from "./ChatInput";
import { useAuthStore } from "../../store/authStore";
import { useChatStore } from "../../store/chatStore";
import { useTranslation } from "react-i18next";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import ReplayIcon from "@mui/icons-material/Replay";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import StopIcon from "@mui/icons-material/Stop";
import { useSnackbar } from "notistack";
import DropZone from "./DropZone"; // اگر مسیرت فرق داره، اصلاحش کن

export default function ChatView() {
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();

  const plan = useAuthStore((s) => s.plan);
  const user = useAuthStore((s) => s.user);
  const usage = useAuthStore((s) => s.usage);
  const limits = useAuthStore((s) => s.limits());
  const canSendMessage = useAuthStore((s) => s.canSendMessage);
  const incMessage = useAuthStore((s) => s.incMessage);

  const activeId = useChatStore((s) => s.activeId);
  const activeConversation = useChatStore((s) => s.activeConversation());
  const appendMessage = useChatStore((s) => s.appendMessage);
  const replaceLastAssistant = useChatStore((s) => s.replaceLastAssistant);
  const updateLastMessage = useChatStore((s) => s.updateLastMessage);

  const messages = activeConversation?.messages || [];
  const disabled = !canSendMessage();

  const [isTyping, setIsTyping] = useState(false);
  const typingTimer = useRef(null);

  const bottomRef = useRef(null);

  // attachments (demo)
  const [attachments, setAttachments] = useState([]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length]);

  useEffect(() => {
    return () => {
      if (typingTimer.current) clearTimeout(typingTimer.current);
    };
  }, []);

  const helperText = useMemo(() => {
    if (disabled) return t("guestLimitReached");
    const left = limits.messagesPerDay - usage.messagesToday;
    const who = user ? `(${plan.toUpperCase()})` : "(GUEST)";
    return `${who} ${t("messagesLeft", { count: left })}`;
  }, [disabled, limits.messagesPerDay, usage.messagesToday, user, plan, t]);

  const onFiles = (files) => {
    // demo: فقط نمایش در UI
    const safe = (files || []).slice(0, 10).map((f) => ({
      name: f.name,
      size: f.size,
      type: f.type,
      lastModified: f.lastModified,
    }));
    setAttachments((prev) => [...safe, ...prev].slice(0, 10));
    enqueueSnackbar(`Attached: ${safe.map((x) => x.name).join(", ")}`, { variant: "info" });
  };

  const clearAttachments = () => setAttachments([]);

  const send = (text) => {
    if (disabled || !activeId) return;
    if (isTyping) return;

    appendMessage(activeId, {
      role: "user",
      text,
      ts: Date.now(),
      attachments: attachments.length ? attachments : undefined,
    });
    incMessage();

    // بعد از ارسال، فایل‌ها ریست شوند (مثل اکثر چت‌ها)
    if (attachments.length) clearAttachments();

    // add pending assistant bubble
    appendMessage(activeId, { role: "assistant", text: "", ts: Date.now(), pending: true });
    setIsTyping(true);

    // demo response (later: real streaming)
    typingTimer.current = setTimeout(() => {
      updateLastMessage(activeId, {
        text: t("demoAnswer"),
        pending: false,
        ts: Date.now(),
      });
      setIsTyping(false);
    }, 800);
  };

  const stop = () => {
    if (!activeId) return;
    if (typingTimer.current) clearTimeout(typingTimer.current);

    updateLastMessage(activeId, {
      text: "⛔ Stopped.",
      pending: false,
      ts: Date.now(),
    });

    setIsTyping(false);
    enqueueSnackbar("Stopped", { variant: "info" });
  };

  const copyLast = async () => {
    const last = [...messages].reverse().find((m) => m.role === "assistant" && !m.pending);
    if (!last) return;
    try {
      await navigator.clipboard.writeText(last.text);
      enqueueSnackbar(t("copy"), { variant: "success" });
    } catch {
      enqueueSnackbar("Copy failed", { variant: "error" });
    }
  };

  const regenerate = () => {
    if (!activeId) return;
    if (isTyping) return;

    replaceLastAssistant(activeId, t("demoAnswer"));
    enqueueSnackbar(t("regenerate"), { variant: "info" });
  };

  return (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column", minHeight: 0 }}>
      <Box sx={{ flex: 1, minHeight: 0, overflow: "auto" }}>
        <Container maxWidth="md" sx={{ py: 3 }}>
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <Typography variant="caption" color="text.secondary">
              Chat • Conversations • Shortcuts: Ctrl+K / Ctrl+Enter
            </Typography>

            <Box sx={{ display: "flex", gap: 0.5, alignItems: "center" }}>
              {isTyping ? (
                <Button size="small" startIcon={<StopIcon />} onClick={stop} variant="outlined">
                  Stop
                </Button>
              ) : null}

              <Tooltip title={t("copy")}>
                <IconButton size="small" onClick={copyLast}>
                  <ContentCopyIcon fontSize="small" />
                </IconButton>
              </Tooltip>

              <Tooltip title={t("regenerate")}>
                <IconButton size="small" onClick={regenerate}>
                  <ReplayIcon fontSize="small" />
                </IconButton>
              </Tooltip>

              <Tooltip title="Like">
                <IconButton
                  size="small"
                  onClick={() => enqueueSnackbar("👍", { variant: "success" })}
                >
                  <ThumbUpIcon fontSize="small" />
                </IconButton>
              </Tooltip>

              <Tooltip title="Dislike">
                <IconButton
                  size="small"
                  onClick={() => enqueueSnackbar("👎", { variant: "warning" })}
                >
                  <ThumbDownIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>

          {/* Dropzone (demo) */}
          <Box sx={{ mt: 2 }}>
            <DropZone onFiles={onFiles} />
          </Box>

          {/* Attachments preview */}
          {attachments.length ? (
            <Paper
              sx={{
                mt: 2,
                p: 1.5,
                bgcolor: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.10)",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <Typography variant="caption" color="text.secondary">
                  Attachments
                </Typography>
                <Button size="small" variant="text" onClick={clearAttachments}>
                  Clear
                </Button>
              </Box>

              <Box sx={{ mt: 1 }}>
                {attachments.map((f) => (
                  <Typography key={f.name} variant="body2" sx={{ opacity: 0.9 }}>
                    {f.name} • {Math.round(f.size / 1024)} KB
                  </Typography>
                ))}
              </Box>
            </Paper>
          ) : null}

          <Box sx={{ mt: 2 }}>
            {messages.map((msg, idx) => (
              <MessageBubble
                key={idx}
                role={msg.role}
                text={msg.text}
                ts={msg.ts}
                pending={msg.pending}
              />
            ))}
            <div ref={bottomRef} />
          </Box>
        </Container>
      </Box>

      <ChatInput onSend={send} disabled={disabled || isTyping} helperText={helperText} />
    </Box>
  );
}

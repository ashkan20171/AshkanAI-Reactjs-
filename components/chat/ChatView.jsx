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
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { useSnackbar } from "notistack";
import DropZone from "./DropZone";
import { mockStream } from "../../services/ai/mockStream";
import { makeMockAnswer } from "../../services/ai/mockBrain";

export default function ChatView() {
  const { t, i18n } = useTranslation();
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
  const abortRef = useRef(null);
  const [lastUserText, setLastUserText] = useState(null);
  const [lastStopped, setLastStopped] = useState(false);

  const bottomRef = useRef(null);

  // attachments (demo)
  const [attachments, setAttachments] = useState([]);

  // ✅ خیلی مهم: حین استریم هم اسکرول پایین بماند
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length, messages[messages.length - 1]?.text]);

  useEffect(() => {
    return () => {
      abortRef.current?.abort();
    };
  }, []);

  const helperText = useMemo(() => {
    if (disabled) return t("guestLimitReached");
    const left = limits.messagesPerDay - usage.messagesToday;
    const who = user ? `(${plan.toUpperCase()})` : "(GUEST)";
    return `${who} ${t("messagesLeft", { count: left })}`;
  }, [disabled, limits.messagesPerDay, usage.messagesToday, user, plan, t]);

  const onFiles = (files) => {
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

  const runStreamingIntoLastAssistant = async ({ userText }) => {
    if (!activeId) return;

    // stop previous stream
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setIsTyping(true);
    setLastStopped(false);

    const full = makeMockAnswer(userText, i18n.language);
    let acc = "";

    try {
      await mockStream({
        signal: controller.signal,
        text: full,
        onToken: (tok) => {
          acc += tok;
          // ✅ اینجا باید باعث رندر فوری بشه (chatStore ایمیوتبل شد)
          updateLastMessage(activeId, {
            text: acc,
            pending: true,
            stopped: false,
            ts: Date.now(),
          });
        },
      });

      updateLastMessage(activeId, { text: acc, pending: false, stopped: false, ts: Date.now() });
    } catch (e) {
      if (e?.name === "AbortError") {
        updateLastMessage(activeId, { text: acc, pending: false, stopped: true, ts: Date.now() });
        setLastStopped(true);
        return;
      }

      updateLastMessage(activeId, {
        text: `⚠️ Error: ${e?.message || "Unknown error"}`,
        pending: false,
        stopped: false,
        ts: Date.now(),
      });
    } finally {
      setIsTyping(false);
    }
  };

  const send = async (text) => {
    if (disabled || !activeId) return;
    if (isTyping) return;

    const trimmed = (text || "").trim();
    if (!trimmed) return;

    setLastUserText(trimmed);

    appendMessage(activeId, {
      role: "user",
      text: trimmed,
      ts: Date.now(),
      attachments: attachments.length ? attachments : undefined,
    });
    incMessage();

    if (attachments.length) clearAttachments();

    // ✅ assistant pending پیام آخر می‌شود
    appendMessage(activeId, { role: "assistant", text: "", ts: Date.now(), pending: true, stopped: false });

    await runStreamingIntoLastAssistant({ userText: trimmed });
  };

  const stop = () => {
    if (!activeId) return;
    abortRef.current?.abort();
    abortRef.current = null;
    enqueueSnackbar("Stopped", { variant: "info" });
  };

  const continueAnswer = async () => {
    if (!activeId) return;
    if (isTyping) return;
    if (!lastUserText) return;

    appendMessage(activeId, { role: "assistant", text: "", ts: Date.now(), pending: true, stopped: false });
    await runStreamingIntoLastAssistant({ userText: lastUserText });
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

  const regenerate = async () => {
    if (!activeId) return;
    if (isTyping) return;
    if (!lastUserText) return;

    // reset last assistant message, then stream into it
    replaceLastAssistant(activeId, "");
    updateLastMessage(activeId, { pending: true, stopped: false, ts: Date.now() });
    await runStreamingIntoLastAssistant({ userText: lastUserText });

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
              ) : lastStopped ? (
                <Button size="small" startIcon={<PlayArrowIcon />} onClick={continueAnswer} variant="outlined">
                  Continue
                </Button>
              ) : null}

              <Tooltip title={t("copy")}>
                <IconButton size="small" onClick={copyLast}>
                  <ContentCopyIcon fontSize="small" />
                </IconButton>
              </Tooltip>

              <Tooltip title={t("regenerate")}>
                <IconButton size="small" onClick={regenerate} disabled={!lastUserText || isTyping}>
                  <ReplayIcon fontSize="small" />
                </IconButton>
              </Tooltip>

              <Tooltip title="Like">
                <IconButton size="small" onClick={() => enqueueSnackbar("👍", { variant: "success" })}>
                  <ThumbUpIcon fontSize="small" />
                </IconButton>
              </Tooltip>

              <Tooltip title="Dislike">
                <IconButton size="small" onClick={() => enqueueSnackbar("👎", { variant: "warning" })}>
                  <ThumbDownIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>

          <Box sx={{ mt: 2 }}>
            <DropZone onFiles={onFiles} />
          </Box>

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
            {/* ✅ مهم: key باید msg.id باشد */}
            {messages.map((msg) => (
              <MessageBubble key={msg.id} role={msg.role} text={msg.text} ts={msg.ts} pending={msg.pending} />
            ))}
            <div ref={bottomRef} />
          </Box>
        </Container>
      </Box>

      <ChatInput onSend={send} disabled={disabled || isTyping} helperText={helperText} />
    </Box>
  );
}

import { Box, Paper, Typography } from "@mui/material";

function formatTime(ts) {
  if (!ts) return "";
  const d = new Date(ts);
  return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

export default function MessageBubble({ role, text, ts, pending }) {
  const isUser = role === "user";

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: isUser ? "flex-end" : "flex-start",
        my: 1,
      }}
    >
      <Paper
        sx={{
          px: 2,
          py: 1.2,
          maxWidth: "min(720px, 90%)",
          bgcolor: isUser ? "rgba(110,168,254,0.18)" : "rgba(255,255,255,0.06)",
          border: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <Typography variant="body1" sx={{ whiteSpace: "pre-wrap", lineHeight: 1.7 }}>
          {text}
          {pending ? "▍" : ""}
        </Typography>

        <Box sx={{ mt: 1 }}>
          <Typography variant="caption" color="text.secondary">
            {pending ? "typing…" : formatTime(ts)}
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
}

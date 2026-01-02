import { Box, Paper, Typography } from "@mui/material";

export default function MessageBubble({ role, text }) {
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
        <Typography
          variant="body1"
          sx={{ whiteSpace: "pre-wrap", lineHeight: 1.7 }}
        >
          {text}
        </Typography>
      </Paper>
    </Box>
  );
}

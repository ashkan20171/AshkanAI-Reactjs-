import { Box, IconButton, Paper, TextField, Typography } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useState } from "react";

export default function ChatInput({ onSend, disabled, helperText }) {
  const [value, setValue] = useState("");

  const submit = () => {
    const v = value.trim();
    if (!v || disabled) return;
    onSend(v);
    setValue("");
  };

  return (
    <Box sx={{ px: 2, pb: 2 }}>
      {helperText ? (
        <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: "block" }}>
          {helperText}
        </Typography>
      ) : null}

      <Paper
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          p: 1,
          border: "1px solid rgba(255,255,255,0.08)",
          bgcolor: "rgba(255,255,255,0.04)",
        }}
      >
        <TextField
          fullWidth
          placeholder="پیامت رو بنویس…"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              submit();
            }
          }}
          multiline
          maxRows={6}
          variant="standard"
          InputProps={{ disableUnderline: true }}
          disabled={disabled}
        />
        <IconButton onClick={submit} disabled={disabled || !value.trim()}>
          <SendIcon />
        </IconButton>
      </Paper>
    </Box>
  );
}

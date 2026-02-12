import { Box, Button, Paper, Typography } from "@mui/material";
import { tools } from "../../services/tools/registry";
import { useTranslation } from "react-i18next";

export default function ToolsPanel({ onRunTool, disabled }) {
  const { i18n } = useTranslation();
  const isFa = (i18n.language || "").startsWith("fa");

  return (
    <Paper
      sx={{
        p: 1.5,
        bgcolor: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.10)",
      }}
    >
      <Typography variant="caption" color="text.secondary">
        Tools
      </Typography>

      <Box sx={{ mt: 1, display: "flex", flexWrap: "wrap", gap: 1 }}>
        {tools.map((t) => (
          <Button key={t.id} size="small" variant="outlined" disabled={disabled} onClick={() => onRunTool(t.id)}>
            {isFa ? t.labelFa : t.labelEn}
          </Button>
        ))}
      </Box>
    </Paper>
  );
}

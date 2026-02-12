import { Box, Typography } from "@mui/material";

export default function DropZone({ onFiles }) {
  const onDrop = (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files || []);
    if (files.length) onFiles(files);
  };

  return (
    <Box
      onDragOver={(e) => e.preventDefault()}
      onDrop={onDrop}
      sx={{
        p: 2,
        borderRadius: 2,
        border: "1px dashed rgba(255,255,255,0.2)",
        bgcolor: "rgba(255,255,255,0.04)",
        textAlign: "center",
      }}
    >
      <Typography variant="body2" color="text.secondary">
        Drag & Drop files here (Demo)
      </Typography>
    </Box>
  );
}

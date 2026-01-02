import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Stack,
  Typography,
  Slider,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { useSettingsStore } from "../../store/settingsStore";

export default function SettingsDialog({ open, onClose }) {
  const fontSize = useSettingsStore((s) => s.fontSize);
  const density = useSettingsStore((s) => s.density);
  const glass = useSettingsStore((s) => s.glass);

  const setFontSize = useSettingsStore((s) => s.setFontSize);
  const setDensity = useSettingsStore((s) => s.setDensity);
  const setGlass = useSettingsStore((s) => s.setGlass);
  const reset = useSettingsStore((s) => s.reset);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>Settings</DialogTitle>
      <DialogContent>
        <Stack spacing={3} sx={{ mt: 1 }}>
          <div>
            <Typography gutterBottom>Font size: {fontSize}px</Typography>
            <Slider value={fontSize} min={12} max={20} onChange={(_, v) => setFontSize(v)} />
          </div>

          <div>
            <Typography gutterBottom>Density</Typography>
            <ToggleButtonGroup
              value={density}
              exclusive
              onChange={(_, v) => v && setDensity(v)}
              size="small"
            >
              <ToggleButton value="comfort">Comfort</ToggleButton>
              <ToggleButton value="compact">Compact</ToggleButton>
            </ToggleButtonGroup>
          </div>

          <div>
            <Typography gutterBottom>Glass opacity: {glass}</Typography>
            <Slider value={glass} min={0.02} max={0.2} step={0.01} onChange={(_, v) => setGlass(v)} />
          </div>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={reset}>Reset</Button>
        <Button variant="contained" onClick={onClose}>Done</Button>
      </DialogActions>
    </Dialog>
  );
}

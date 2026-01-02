import { AppBar, Box, Toolbar, Typography, Button } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

export default function Header() {
  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        bgcolor: "rgba(0,0,0,0)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        backdropFilter: "blur(10px)",
      }}
    >
      <Toolbar sx={{ gap: 2 }}>
        <Typography variant="h6" fontWeight={800} sx={{ letterSpacing: 0.2 }}>
          Ashkan AI
        </Typography>

        <Box sx={{ flex: 1 }} />

        <Button component={RouterLink} to="/pricing" variant="text">
          پلن‌ها
        </Button>
        <Button component={RouterLink} to="/login" variant="contained">
          ورود / ثبت‌نام
        </Button>
      </Toolbar>
    </AppBar>
  );
}

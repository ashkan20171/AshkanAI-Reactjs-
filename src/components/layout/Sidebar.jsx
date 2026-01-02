import {
  Box,
  Button,
  Divider,
  List,
  ListItemButton,
  ListItemText,
  Typography,
  Chip,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const demoChats = [
  { id: "1", title: "ایده های کسب و کار" },
  { id: "2", title: "کدنویسی React" },
  { id: "3", title: "ساخت لوگو برای Ashkan AI" },
];

export default function Sidebar() {
  return (
    <Box
      sx={{
        width: { xs: 0, md: 300 },
        bgcolor: "background.paper",
        borderRight: "1px solid rgba(255,255,255,0.06)",
        display: { xs: "none", md: "flex" },
        flexDirection: "column",
      }}
    >
      <Box sx={{ p: 2 }}>
        <Button
          fullWidth
          variant="outlined"
          startIcon={<AddIcon />}
          sx={{
            justifyContent: "flex-start",
            borderColor: "rgba(255,255,255,0.12)",
            py: 1.2,
          }}
        >
          New chat
        </Button>

        <Box sx={{ mt: 2, display: "flex", gap: 1, alignItems: "center" }}>
          <Chip size="small" label="Guest" />
          <Typography variant="caption" color="text.secondary">
            دسترسی محدود
          </Typography>
        </Box>
      </Box>

      <Divider />

      <Box sx={{ p: 1, flex: 1, overflow: "auto" }}>
        <Typography variant="caption" color="text.secondary" sx={{ px: 1 }}>
          Chats
        </Typography>
        <List dense>
          {demoChats.map((c) => (
            <ListItemButton
              key={c.id}
              sx={{
                borderRadius: 2,
                mx: 1,
                my: 0.5,
              }}
            >
              <ListItemText
                primary={c.title}
                primaryTypographyProps={{ noWrap: true }}
              />
            </ListItemButton>
          ))}
        </List>
      </Box>

      <Divider />

      <Box sx={{ p: 2 }}>
        <Typography variant="body2" fontWeight={700}>
          Ashkan AI
        </Typography>
        <Typography variant="caption" color="text.secondary">
          ارتقا پلن → امکانات بیشتر
        </Typography>
      </Box>
    </Box>
  );
}

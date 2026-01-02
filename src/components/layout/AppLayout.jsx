import { Box } from "@mui/material";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { useState } from "react";

export default function AppLayout({ children }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <Box sx={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      <Sidebar
        variant="desktop"
      />
      <Sidebar
        variant="mobile"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
      />

      <Box sx={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        <Header onOpenSidebar={() => setMobileOpen(true)} />
        <Box sx={{ flex: 1, minHeight: 0 }}>{children}</Box>
      </Box>
    </Box>
  );
}

import { Box } from "@mui/material";
import Sidebar from "./Sidebar";
import Header from "./Header";

export default function AppLayout({ children }) {
  return (
    <Box sx={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      <Sidebar />
      <Box sx={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        <Header />
        <Box sx={{ flex: 1, minHeight: 0 }}>{children}</Box>
      </Box>
    </Box>
  );
}

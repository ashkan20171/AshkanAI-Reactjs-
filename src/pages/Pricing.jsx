import { Container, Paper, Typography } from "@mui/material";
import AppLayout from "../components/layout/AppLayout";

export default function Pricing() {
  return (
    <AppLayout>
      <Container maxWidth="md" sx={{ py: 5 }}>
        <Paper sx={{ p: 3, border: "1px solid rgba(255,255,255,0.08)" }}>
          <Typography variant="h5" fontWeight={800} gutterBottom>
            پلن‌ها
          </Typography>
          <Typography color="text.secondary">
            (در مرحله بعدی پلن‌ها و پرداخت را کامل می‌کنیم)
          </Typography>
        </Paper>
      </Container>
    </AppLayout>
  );
}

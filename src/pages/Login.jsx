import { Container, Paper, Typography } from "@mui/material";
import AppLayout from "../components/layout/AppLayout";

export default function Login() {
  return (
    <AppLayout>
      <Container maxWidth="sm" sx={{ py: 5 }}>
        <Paper sx={{ p: 3, border: "1px solid rgba(255,255,255,0.08)" }}>
          <Typography variant="h5" fontWeight={800} gutterBottom>
            ورود / ثبت‌نام
          </Typography>
          <Typography color="text.secondary">
            (در مرحله بعدی این صفحه را کامل و عملیاتی می‌کنیم)
          </Typography>
        </Paper>
      </Container>
    </AppLayout>
  );
}

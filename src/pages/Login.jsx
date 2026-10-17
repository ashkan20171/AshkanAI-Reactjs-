import {
  Alert,
  Box,
  Button,
  Container,
  Paper,
  Stack,
  TextField,
  Typography,
  Divider,
} from "@mui/material";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useLocation } from "react-router-dom";
import AppLayout from "../components/layout/AppLayout";
import { useAuthStore } from "../store/authStore";

export default function Login() {
  const { i18n } = useTranslation();
  const fa = i18n.language.startsWith("fa");
  const navigate = useNavigate();
  const location = useLocation();
  const login = useAuthStore((s) => s.login);

  const from = location.state?.from || "/";

  const [mode, setMode] = useState("login"); // login | register
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  const title = useMemo(
    () => (mode === "login" ? (fa ? "ورود به Ashkan AI" : "Sign in to Ashkan AI") : (fa ? "ثبت‌نام در Ashkan AI" : "Create your account")),
    [mode, fa]
  );

  const submit = () => {
    setError("");

    if (mode === "register" && form.name.trim().length < 2) {
      setError("نام باید حداقل ۲ کاراکتر باشد.");
      return;
    }
    if (!form.email.includes("@")) {
      setError("ایمیل معتبر نیست.");
      return;
    }
    if (form.password.length < 6) {
      setError("رمز عبور باید حداقل ۶ کاراکتر باشد.");
      return;
    }

    // فعلاً دمو: لاگین فیک
    login({ name: form.name || "Ashkan", email: form.email });
    navigate(from, { replace: true });
  };

  return (
    <AppLayout>
      <Container maxWidth="sm" sx={{ py: 6 }}>
        <Paper
          sx={{
            p: 3,
            border: "1px solid rgba(255,255,255,0.08)",
            bgcolor: "rgba(255,255,255,0.03)",
          }}
        >
          <Typography variant="h5" fontWeight={900} gutterBottom>
            {title}
          </Typography>
          <Typography color="text.secondary" gutterBottom>
            {fa ? "ورود و ثبت‌نام در حال حاضر صرفاً نمایشی است؛ رمز عبور در سرور بررسی نمی‌شود." : "Demo authentication only: passwords are not verified by a server."}
          </Typography>

          <Divider sx={{ my: 2, opacity: 0.2 }} />

          {error ? (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          ) : null}

          <Stack spacing={2}>
            {mode === "register" ? (
              <TextField
                label="نام"
                value={form.name}
                onChange={(e) => setForm((s) => ({ ...s, name: e.target.value }))}
                fullWidth
              />
            ) : null}

            <TextField
              label="ایمیل"
              value={form.email}
              onChange={(e) => setForm((s) => ({ ...s, email: e.target.value }))}
              fullWidth
            />
            <TextField
              label="رمز عبور"
              type="password"
              value={form.password}
              onChange={(e) => setForm((s) => ({ ...s, password: e.target.value }))}
              fullWidth
            />

            <Button variant="contained" size="large" onClick={submit}>
              {mode === "login" ? "ورود" : "ثبت‌نام"}
            </Button>

            <Box sx={{ display: "flex", justifyContent: "space-between", gap: 2 }}>
              <Button
                variant="text"
                onClick={() => setMode((m) => (m === "login" ? "register" : "login"))}
              >
                {mode === "login" ? "ثبت‌نام نکرده‌اید؟ ثبت‌نام" : "حساب دارید؟ ورود"}
              </Button>
              <Button variant="text" onClick={() => navigate("/pricing")}>
                مشاهده پلن‌ها
              </Button>
            </Box>
          </Stack>
        </Paper>
      </Container>
    </AppLayout>
  );
}

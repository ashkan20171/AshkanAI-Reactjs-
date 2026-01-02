import {
  Box,
  Button,
  Container,
  Paper,
  Stack,
  Typography,
  Chip,
} from "@mui/material";
import AppLayout from "../components/layout/AppLayout";
import { useAuthStore } from "../store/authStore";

function PlanCard({ title, price, tag, features, onSelect, primary }) {
  return (
    <Paper
      sx={{
        p: 3,
        border: "1px solid rgba(255,255,255,0.10)",
        bgcolor: primary ? "rgba(110,168,254,0.10)" : "rgba(255,255,255,0.03)",
      }}
    >
      <Stack spacing={1.5}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography variant="h6" fontWeight={900}>{title}</Typography>
          {tag ? <Chip size="small" label={tag} /> : null}
        </Box>
        <Typography variant="h4" fontWeight={900}>
          {price}
        </Typography>
        <Box sx={{ color: "text.secondary", lineHeight: 1.9 }}>
          {features.map((f) => (
            <div key={f}>• {f}</div>
          ))}
        </Box>
        <Button variant={primary ? "contained" : "outlined"} size="large" onClick={onSelect}>
          انتخاب
        </Button>
      </Stack>
    </Paper>
  );
}

export default function Pricing() {
  const plan = useAuthStore((s) => s.plan);
  const setPlan = useAuthStore((s) => s.setPlan);

  return (
    <AppLayout>
      <Container maxWidth="md" sx={{ py: 6 }}>
        <Typography variant="h4" fontWeight={950} gutterBottom>
          پلن‌های Ashkan AI
        </Typography>
        <Typography color="text.secondary" gutterBottom>
          پلن فعلی شما: <b>{plan.toUpperCase()}</b> (فعلاً دمو)
        </Typography>

        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr 1fr" }, gap: 2, mt: 3 }}>
          <PlanCard
            title="Guest"
            price="رایگان"
            tag="بدون لاگین"
            features={[
              "۵ پیام در روز",
              "فقط متن (دمو)",
              "دسترسی محدود",
            ]}
            onSelect={() => setPlan("guest")}
          />
          <PlanCard
            title="Free"
            price="رایگان"
            tag="با لاگین"
            features={[
              "۲۰ پیام در روز",
              "بهبود کیفیت پاسخ",
              "ذخیره تاریخچه (مرحله بعد)",
            ]}
            onSelect={() => setPlan("free")}
            primary
          />
          <PlanCard
            title="Pro"
            price="اشتراکی"
            tag="امکانات بیشتر"
            features={[
              "۲۰۰ پیام در روز",
              "تولید تصویر",
              "تولید صدا/موزیک (مرحله بعد)",
            ]}
            onSelect={() => setPlan("pro")}
          />
        </Box>

        <Typography variant="caption" color="text.secondary" sx={{ mt: 2, display: "block" }}>
          پرداخت واقعی + فعال‌سازی پلن‌ها را در فاز پرداخت و بک‌اند اضافه می‌کنیم.
        </Typography>
      </Container>
    </AppLayout>
  );
}

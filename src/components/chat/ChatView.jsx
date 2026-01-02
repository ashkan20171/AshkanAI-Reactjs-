import { Box, Container, Typography } from "@mui/material";
import { useMemo, useState } from "react";
import MessageBubble from "./MessageBubble";
import ChatInput from "./ChatInput";

const guestLimit = 5;

export default function ChatView() {
  const [messages, setMessages] = useState([
    { role: "assistant", text: "سلام! من Ashkan AI هستم. چی دوست داری امروز انجام بدیم؟" },
  ]);
  const [guestUsed, setGuestUsed] = useState(0);

  const isGuestLimited = guestUsed >= guestLimit;

  const helperText = useMemo(() => {
    if (isGuestLimited) return "محدودیت مهمان پر شد. برای ادامه وارد شوید یا پلن تهیه کنید.";
    return `حالت مهمان: ${guestLimit - guestUsed} پیام باقی مانده`;
  }, [guestUsed, isGuestLimited]);

  const send = (text) => {
    setMessages((m) => [...m, { role: "user", text }]);
    setGuestUsed((x) => x + 1);

    const demoAnswer =
      "این پاسخ دموی Ashkan AI هست. مرحله بعدی: بک‌اند + اتصال به مدل AI + مدیریت پلن‌ها و محدودیت واقعی.";

    setTimeout(() => {
      setMessages((m) => [...m, { role: "assistant", text: demoAnswer }]);
    }, 400);
  };

  return (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column", minHeight: 0 }}>
      <Box sx={{ flex: 1, minHeight: 0, overflow: "auto" }}>
        <Container maxWidth="md" sx={{ py: 3 }}>
          <Typography variant="caption" color="text.secondary">
            Chat • نسخه اولیه UI شبیه ChatGPT
          </Typography>

          <Box sx={{ mt: 2 }}>
            {messages.map((msg, idx) => (
              <MessageBubble key={idx} role={msg.role} text={msg.text} />
            ))}
          </Box>
        </Container>
      </Box>

      <ChatInput onSend={send} disabled={isGuestLimited} helperText={helperText} />
    </Box>
  );
}

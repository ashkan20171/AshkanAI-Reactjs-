export function mockAI(input, mode = "smart") {
  const base = {
    smart: "🧠 پاسخ تحلیلی AshkanAI:",
    creative: "✨ پاسخ خلاقانه AshkanAI:",
    ultra: "🚀 پاسخ فوق‌پیشرفته AshkanAI:",
  };

  const replies = {
    smart: `تجزیه و تحلیل شما: ${input}`,
    creative: `برداشت خلاقانه از پیام شما: ${input}`,
    ultra: `تحلیل عمیق و لایه‌ای از پیام شما: ${input}`,
  };

  return `${base[mode]}\n${replies[mode]}`;
}

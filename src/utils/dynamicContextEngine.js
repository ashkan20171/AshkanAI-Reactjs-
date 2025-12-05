// src/utils/dynamicContextEngine.js

export function extractContext(messages, limit = 6) {
  if (!messages || messages.length === 0) return "";

  // آخرین N پیام
  const recent = messages.slice(-limit);

  // فقط پیام‌های متنی را تبدیل می‌کنیم
  const textOnly = recent
    .filter((m) => m.text && m.from !== "system")
    .map((m) => `${m.from === "user" ? "User" : "AI"}: ${m.text}`)
    .join("\n");

  return textOnly;
}

export function applyContextLayer(response, context) {
  if (!context || context.length < 10) return response;

  return (
    `Here is the conversation context:\n${context}\n\n` +
    "Based on the above, " +
    response
  );
}

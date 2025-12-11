import { askGroq } from "./aiService";

export async function codeAssistantTask(prompt) {
  const systemMessage = `
تو یک دستیار حرفه‌ای برنامه‌نویسی هستی.
- کد تولید کن
- خطاها را رفع کن
- کد را به زبان دیگر تبدیل کن
- refactor حرفه‌ای انجام بده
- از Markdown برای کد استفاده کن مثل:
\`\`\`js
// code here
\`\`\`
- کد را کامل و بدون حذف بنویس.
`;

  const messages = [
    { role: "system", content: systemMessage },
    { role: "user", content: prompt }
  ];

  const result = await askGroq(messages, "precise");
  return result;
}

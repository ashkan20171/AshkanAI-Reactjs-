const API_KEY = "GROQ_API_KEY_را_اینجا_بزار";

export async function askGroq(messages, mode = "balanced") {
  let model = "mixtral-8x7b-32768"; // مدل پیشنهادی

  if (mode === "precise") model = "llama3-8b-8192"; // پاسخ دقیق
  if (mode === "creative") model = "llama3-70b-8192"; // خلاقانه

  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      messages,
      temperature: mode === "creative" ? 0.8 : 0.3,
      max_tokens: 2048,
      stream: false
    }),
  });

  const data = await response.json();
  return data?.choices?.[0]?.message?.content || "خطا در دریافت پاسخ";
}

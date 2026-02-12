const wait = (ms) => new Promise((r) => setTimeout(r, ms));

export const tools = [
  {
    id: "summarize",
    labelFa: "خلاصه‌سازی",
    labelEn: "Summarize",
    run: async ({ text }) => {
      await wait(350);
      const t = String(text || "").trim();
      return `✅ خلاصه:\n- ${t.slice(0, 120)}${t.length > 120 ? "..." : ""}`;
    },
  },
  {
    id: "rewrite_pro",
    labelFa: "بازنویسی حرفه‌ای",
    labelEn: "Rewrite (Pro)",
    run: async ({ text }) => {
      await wait(450);
      const t = String(text || "").trim();
      return `✅ نسخه بازنویسی‌شده:\n${t}\n\n(دمو)`;
    },
  },
  {
    id: "translate_fa_en",
    labelFa: "ترجمه فارسی → انگلیسی",
    labelEn: "Translate FA → EN",
    run: async ({ text }) => {
      await wait(450);
      const t = String(text || "").trim();
      return `✅ EN (mock):\n${t}`;
    },
  },
  {
    id: "extract_tasks",
    labelFa: "استخراج تسک‌ها",
    labelEn: "Extract tasks",
    run: async ({ text }) => {
      await wait(400);
      const t = String(text || "").trim();
      return `✅ تسک‌ها (دمو):\n- Task 1 از "${t.slice(0, 25)}..."\n- Task 2\n- Task 3`;
    },
  },
];

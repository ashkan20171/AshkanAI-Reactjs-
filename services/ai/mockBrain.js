export function makeMockAnswer(userText, lang = "fa") {
  const q = (userText || "").trim();
  const isFa = (lang || "").toString().startsWith("fa");

  // یک پاسخ طولانی‌تر برای اینکه استریم واقعاً حس بشه
  const reactFa = `
React (ریکْت) یک کتابخانه جاوااسکریپت برای ساخت UI است که توسط Meta توسعه داده شده و مبتنی بر «کامپوننت»‌هاست.

1) کامپوننت‌ها
- UI را به قطعات کوچک و قابل‌استفاده‌مجدد تقسیم می‌کنی.
- هر کامپوننت می‌تواند state و props داشته باشد.

2) State و Props
- Props ورودی‌های یک کامپوننت هستند و از والد به فرزند پاس داده می‌شوند.
- State داده داخلی یک کامپوننت است که با تغییرش UI دوباره رندر می‌شود.

3) Virtual DOM و Re-render
React تغییرات را ابتدا در Virtual DOM حساب می‌کند و سپس کمترین تغییرات لازم را روی DOM واقعی اعمال می‌کند تا سریع باشد.

4) Hooks (هوک‌ها)
- useState برای مدیریت state
- useEffect برای اجرای side-effectها (مثل fetch)
- useMemo/useCallback برای بهینه‌سازی

5) Router و مدیریت داده
برای SPA معمولاً از react-router استفاده می‌شود و برای دیتا/کش هم React Query خیلی رایج است.

اگر دوست داری، بگو پروژه‌ات SPA است یا SSR و چه هدفی داری تا دقیق‌تر پیشنهاد بدم. (این فقط پاسخ دمو است.)`.trim();

  const genericFa = `
باشه. قدم‌به‌قدم انجام می‌دیم:

1) تعریف مسئله
- ${q || "بدون متن"}

2) راه‌حل پیشنهادی
- گزینه A (ساده و سریع)
- گزینه B (حرفه‌ای‌تر و مقیاس‌پذیر)
- گزینه C (بهترین کیفیت با زمان بیشتر)

3) قدم بعدی
اگر بگی هدف نهایی و محدودیت‌هات چیه، دقیق‌ترین مسیر رو می‌چینم.
(این فقط پاسخ دمو است.)`.trim();

  const reactEn = `
React is a JavaScript library for building user interfaces using reusable components.

1) Components
Split UI into small reusable building blocks.

2) Props vs State
Props are inputs from parent; state is internal data that triggers re-render.

3) Virtual DOM
React computes changes and applies minimal DOM updates for performance.

4) Hooks
useState, useEffect, useMemo/useCallback, etc.

Tell me your goal (SPA/SSR, SEO needs) and I’ll tailor a plan. (Mock answer.)`.trim();

  const genericEn = `
Sure — step by step:

1) Problem
- ${q || "No text provided"}

2) Options
- Option A (fast)
- Option B (scalable)
- Option C (best quality, more time)

3) Next step
Share your goal and constraints and I’ll propose the best path. (Mock answer.)`.trim();

  const wantsReact = /react|ریک|ریکت|reactjs/i.test(q);
  if (wantsReact) return isFa ? reactFa : reactEn;
  return isFa ? genericFa : genericEn;
}
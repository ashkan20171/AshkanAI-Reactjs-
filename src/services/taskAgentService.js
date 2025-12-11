import { askGroq } from "./aiService";

export async function taskAgent(prompt) {
  const systemMessage = `
تو یک Task-Agent هوشمند هستی.
وظیفه تو این است که:

1) هدف کاربر را تحلیل کنی  
2) آن را به مراحل قابل انجام تقسیم کنی  
3) زیرکارها را مشخص کنی  
4) مرحله‌ها را به ترتیب منطقی بچینی  
5) اگر لازم بود، زمان‌بندی (Deadline) پیشنهاد بده  
6) ریسک‌ها، پیش‌نیازها و ابزارهای لازم را بگو  
7) در نهایت خروجی را در قالب Markdown برگردان  
8) فرمت خروجی همیشه به‌صورت زیر باشد:

## 🎯 هدف اصلی  
...

## 🧩 مراحل اصلی  
- مرحله ۱: ...
- مرحله ۲: ...

## 🔹 زیرکارهای هر مرحله  
### مرحله ۱  
- مورد ۱  
- مورد ۲  

### مرحله ۲  
...

## ⏳ زمان پیشنهادی  
- مرحله ۱: X ساعت/روز  
- مرحله ۲: ...

## ⚠️ نکات مهم  
- ...

تمام خروجی باید ساختارمند، عملی و قابل اجرا باشد.
`;

  const messages = [
    { role: "system", content: systemMessage },
    { role: "user", content: prompt }
  ];

  const response = await askGroq(messages, "precise");
  return response;
}

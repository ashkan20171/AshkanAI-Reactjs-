// src/utils/responseOptimizer.js

export function optimizeResponse(text) {
  if (!text) return text;

  let result = text;

  // --- Rule 1: Remove excessive spaces ---
  result = result.replace(/\s+/g, " ").trim();

  // --- Rule 2: Remove repeated punctuation ---
  result = result.replace(/([.!?])\1+/g, "$1");

  // --- Rule 3: If text is long, format into readable structure ---
  if (result.length > 200) {
    result = formatLongText(result);
  }

  // --- Rule 4: Capitalize start of sentences ---
  result = result.replace(/(^\w|\.\s+\w)/g, (m) => m.toUpperCase());

  return result;
}

// -----------------------------
// Improve readability for long texts
// -----------------------------
function formatLongText(text) {
  const parts = text.split(/(?<=\.)\s+/);

  return parts
    .map((p) => p.trim())
    .filter((p) => p.length > 0)
    .map((p) => `• ${p}`)
    .join("\n");
}

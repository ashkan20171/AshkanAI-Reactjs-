export function generateTitle(text) {
  if (!text) return "New Chat";

  const cleaned = text
    .replace(/[^a-zA-Z0-9\sآ-ی]/g, "")
    .trim()
    .split(" ")
    .slice(0, 5)
    .join(" ");

  if (cleaned.length < 3) return "New Chat";

  return cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
}

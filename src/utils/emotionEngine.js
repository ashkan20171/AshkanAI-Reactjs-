// src/utils/emotionEngine.js

export function applyEmotionLayer(text, emotion) {
  if (!emotion || emotion === "neutral") return text;

  switch (emotion) {
    case "happy":
      return "😄 " + text;

    case "sad":
      return "💛 " + text;

    case "angry":
      return "😠 " + text;

    case "stressed":
      return "🌿 " + text;

    default:
      return text;
  }
}

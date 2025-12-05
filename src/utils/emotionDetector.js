// utils/emotionDetector.js

// تشخیص ساده احساسات (نسخه ۱ اولیه)
export function detectEmotion(text = "") {
  const t = text.toLowerCase();

  if (!text) return "neutral";

  // Happiness
  if (t.includes("great") || t.includes("love") || t.includes("happy") || t.includes("awesome")) {
    return "happy";
  }

  // Sadness
  if (t.includes("sad") || t.includes("depressed") || t.includes("bad") || t.includes("cry")) {
    return "sad";
  }

  // Anger
  if (t.includes("angry") || t.includes("mad") || t.includes("upset")) {
    return "angry";
  }

  // Stress
  if (t.includes("tired") || t.includes("exhausted") || t.includes("anxious") || t.includes("stress")) {
    return "stressed";
  }

  return "neutral";
}
// utils/emotionEngine.js

export function applyEmotionLayer(response, emotion) {
  switch (emotion) {
    case "happy":
      return "😄 I'm glad you're feeling good! " + response;

    case "sad":
      return "💛 I'm really sorry you're feeling down. I'm here for you. " + response;

    case "angry":
      return "😔 I understand your frustration. Let's work through this calmly. " + response;

    case "stressed":
      return "🌿 Take a deep breath — you're doing your best. " + response;

    default:
      return response;
  }
}

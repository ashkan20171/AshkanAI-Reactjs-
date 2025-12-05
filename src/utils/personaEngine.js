export function applyPersona(persona, text) {
  if (!persona) return text;

  let output = text;

  // لحن AI
  if (persona.tone === "friendly") {
    output = "😊 " + output;
  }
  if (persona.tone === "formal") {
    output = "📘 " + output;
  }

  // رفتار خاص پرسونا
  if (persona.behavior) {
    output += `\n\n(${persona.behavior})`;
  }

  return output;
}

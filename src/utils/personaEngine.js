export function applyPersona(persona, text) {
  if (!persona) return text;

  let result = text;

  // Tone
  if (persona.tone === "friendly") result = "😊 " + result;
  if (persona.tone === "formal") result = "📘 " + result;
  if (persona.tone === "sarcastic") result = "😏 Well... " + result;

  // Writing style
  if (persona.style === "short") result = result.slice(0, 100);
  if (persona.style === "detailed") result += "\n\n(Providing more detail as requested...)";

  // Behavior instructions
  result = `${persona.behavior}\n\n${result}`;

  return result;
}

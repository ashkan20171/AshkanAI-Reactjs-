export function applyPersona(persona, text) {
  if (!persona) return text;

  let result = text;

  // Tone
  if (persona.tone === "friendly") result = "😊 " + result;
  if (persona.tone === "formal") result = "📘 " + result;
  if (persona.tone === "artistic") result = "🎨 " + result;

  // Style
  if (persona.style === "technical")
    result += "\n\n// Technical formatting applied.";

  if (persona.style === "educational")
    result += "\n\n(Explained step-by-step for learning.)";

  if (persona.style === "creative")
    result += "\n\n✨ (Enhanced creative style applied)";

  // Instructions
  result = `${persona.instructions}\n\n${result}`;

  return result;
}

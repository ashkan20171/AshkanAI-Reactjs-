export function detectPersona(message) {
  const msg = message.toLowerCase();

  if (msg.includes("explain") || msg.includes("what is") || msg.includes("define"))
    return "professor";

  if (msg.includes("code") || msg.includes("bug") || msg.includes("function"))
    return "coder";

  if (msg.includes("story") || msg.includes("once upon"))
    return "storyteller";

  if (msg.includes("translate") || msg.includes("ترجمه"))
    return "translator";

  if (msg.includes("motivate") || msg.includes("i feel") || msg.includes("sad"))
    return "motivator";

  if (msg.includes("poem") || msg.includes("poetry"))
    return "poet";

  if (msg.includes("kids") || msg.includes("explain like i am 5"))
    return "childmode";

  return "assistant"; // default fallback
}

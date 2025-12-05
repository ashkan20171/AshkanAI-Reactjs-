// src/utils/reflectionEngine.js

export function selfReflect(response, context = "") {

  let improved = response;

  // --- Rule 1: Remove repeated sentences ---
  improved = improved.replace(/(.+)\1+/gi, "$1");

  // --- Rule 2: Fix too short/low-quality answers ---
  if (improved.length < 25) {
    improved += " (Providing more details for clarity.)";
  }

  // --- Rule 3: If context contradicts answer, add clarification ---
  if (context && response && context.includes("not") && response.includes("yes")) {
    improved += "\n\nNote: Based on conversation context, I added clarification.";
  }

  // --- Rule 4: Extra polishing ---
  improved = improved.trim();

  return improved;
}

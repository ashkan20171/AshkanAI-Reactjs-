// src/utils/affinityMemoryEngine.js

export function applyAffinityLayers(response, memory) {
  if (!memory) return response;

  let modified = response;

  // --- Name Layer ---
  if (memory.name) {
    modified = `Hey ${memory.name}, ` + modified;
  }

  // --- Interests Layer ---
  if (memory.interests && memory.interests.length > 0) {
    const interest = memory.interests[memory.interests.length - 1];
    modified += `\n\nAlso, since you mentioned you like **${interest}**, I included that in my thinking.`;
  }

  // --- Writing Style Layer ---
  if (memory.writingStyle === "short") {
    modified = modified.slice(0, 120);
  }

  if (memory.writingStyle === "detailed") {
    modified += "\n\n(Expanded with more details because you prefer detailed answers.)";
  }

  // --- Tone Layer ---
  if (memory.tone === "friendly") {
    modified = "😊 " + modified;
  }

  if (memory.tone === "formal") {
    modified = "📘 " + modified;
  }

  return modified;
}

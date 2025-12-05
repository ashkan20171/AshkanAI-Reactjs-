// utils/affinityMemoryEngine.js

export function applyAffinityLayers(response, memory) {
  let output = response;

  // 1) Personal Name Layer
  if (memory.name) {
    output = `Hey ${memory.name}, ` + output;
  }

  // 2) Tone Layer
  if (memory.tone === "friendly") {
    output = "😊 " + output.replace(/\. /g, "! ");
  }
  if (memory.tone === "formal") {
    output = "Dear user, " + output;
  }

  // 3) Writing Style Layer
  if (memory.writingStyle === "short") {
    output = output.slice(0, 120) + "...";
  }
  if (memory.writingStyle === "detailed") {
    output += "\n\n(Additional elaboration provided as you prefer more detailed explanations.)";
  }

  // 4) Interest Affinity Layer
  if (memory.interests.length > 0) {
    const interest = memory.interests[0];

    output += `\n\n🔎 Since you enjoy **${interest}**, here’s something related to it.`;
  }

  // 5) Conversational Topic Layer
  if (memory.recentTopics.length > 0) {
    output += `\n\n🧵 We're still on your previous topic: *${memory.recentTopics[0]}*`;
  }

  return output;
}

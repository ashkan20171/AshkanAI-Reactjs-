const wait = (ms) => new Promise((r) => setTimeout(r, ms));

export async function runMockAgent({ topic, hasFiles, onStep }) {
  const steps = [
    {
      title: "Plan",
      text: `🧠 Plan:\n- Goal: ${topic}\n- Mode: ${hasFiles ? "RAG" : "General"}\n- Steps: 1) Analyze 2) Draft 3) Final`,
    },
    { title: "Execute", text: `⚙️ Executing...\n- Collecting context\n- Building answer\n- Checking format` },
    { title: "Final", text: `✅ Final answer (mock):\n\n${topic}\n\n- Point A\n- Point B\n- Point C` },
  ];

  for (const s of steps) {
    await wait(500);
    onStep(s);
  }
}

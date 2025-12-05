import { useMemory } from "../context/MemoryContext";

export default function MemoryManager() {
  const { memory, setTone, setStyle } = useMemory();

  return (
    <div className="container py-4">
      <h3 className="fw-bold mb-3">🧠 Memory Settings</h3>

      <p><strong>Name:</strong> {memory.name || "Not set"}</p>
      <p><strong>Interests:</strong> {memory.interests.join(", ")}</p>

      <div className="mb-3">
        <label className="form-label">Tone</label>
        <select
          className="form-select"
          onChange={(e) => setTone(e.target.value)}
          value={memory.tone}
        >
          <option value="neutral">Neutral</option>
          <option value="friendly">Friendly</option>
          <option value="formal">Formal</option>
        </select>
      </div>

      <div>
        <label className="form-label">Writing Style</label>
        <select
          className="form-select"
          onChange={(e) => setStyle(e.target.value)}
          value={memory.writingStyle}
        >
          <option value="normal">Normal</option>
          <option value="short">Short</option>
          <option value="detailed">Detailed</option>
        </select>
      </div>
    </div>
  );
}

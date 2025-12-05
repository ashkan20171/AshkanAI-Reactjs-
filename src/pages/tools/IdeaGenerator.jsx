import { useState } from "react";
import { mockAI } from "../../services/ai";

export default function IdeaGenerator() {
  const [topic, setTopic] = useState("");
  const [result, setResult] = useState("");

  const generate = () => {
    const output = mockAI(`Generate creative ideas about: ${topic}`, "creative");
    setResult(output);
  };

  return (
    <div className="container mt-4" style={{ maxWidth: 800 }}>
      <h3 className="fw-bold mb-4">💡 ایده‌ساز خلاقانه AshkanAI</h3>

      <input
        className="form-control mb-3"
        placeholder="موضوع را وارد کنید..."
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
      />

      <button className="btn btn-primary w-100 mb-4" onClick={generate}>
        تولید ایده
      </button>

      {result && (
        <div className="p-3 rounded-4 bg-white shadow-sm">
          {result}
        </div>
      )}
    </div>
  );
}

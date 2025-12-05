import { useState } from "react";
import { mockAI } from "../../services/ai";

export default function Summarizer() {
  const [text, setText] = useState("");
  const [result, setResult] = useState("");

  const summarize = () => {
    const output = mockAI("Summarize this: " + text, "smart");
    setResult(output);
  };

  return (
    <div className="container mt-4" style={{ maxWidth: 800 }}>
      <h3 className="fw-bold mb-4">📝 خلاصه‌ساز متن</h3>

      <textarea
        className="form-control mb-3"
        rows="7"
        placeholder="متن بلند را وارد کنید..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button className="btn btn-primary w-100 mb-4" onClick={summarize}>
        خلاصه کن
      </button>

      {result && (
        <div className="p-3 border rounded-4 bg-white shadow-sm">
          {result}
        </div>
      )}
    </div>
  );
}

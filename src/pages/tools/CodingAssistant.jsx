import { useState } from "react";
import { mockAI } from "../../services/ai";

export default function CodingAssistant() {
  const [text, setText] = useState("");
  const [mode, setMode] = useState("explain");
  const [output, setOutput] = useState("");

  const run = () => {
    const prompt = `${mode}: ${text}`;
    setOutput(mockAI(prompt, "ultra"));
  };

  return (
    <div className="container mt-4" style={{ maxWidth: 900 }}>
      <h3 className="fw-bold mb-4">💻 دستیار کدنویسی AshkanAI</h3>

      <select
        className="form-select mb-3"
        value={mode}
        onChange={(e) => setMode(e.target.value)}
      >
        <option value="explain">توضیح کد</option>
        <option value="fix">رفع خطا</option>
        <option value="optimize">بهینه‌سازی کد</option>
        <option value="convert">تبدیل زبان برنامه‌نویسی</option>
      </select>

      <textarea
        className="form-control mb-3"
        rows="7"
        placeholder="کد یا سوال خود را وارد کنید..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button className="btn btn-primary w-100 mb-4" onClick={run}>
        اجرا
      </button>

      {output && (
        <div className="p-3 rounded-4 bg-white shadow-sm">{output}</div>
      )}
    </div>
  );
}

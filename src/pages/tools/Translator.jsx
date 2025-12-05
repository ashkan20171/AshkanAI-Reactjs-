import { useState } from "react";
import { mockAI } from "../../services/ai";

export default function Translator() {
  const [text, setText] = useState("");
  const [lang, setLang] = useState("english");
  const [result, setResult] = useState("");

  const translate = () => {
    const output = mockAI(`Translate to ${lang}: ${text}`, "smart");
    setResult(output);
  };

  return (
    <div className="container mt-4" style={{ maxWidth: 800 }}>
      <h3 className="fw-bold mb-4">🌍 مترجم هوشمند</h3>

      <select
        className="form-select mb-3"
        value={lang}
        onChange={(e) => setLang(e.target.value)}
      >
        <option value="english">انگلیسی</option>
        <option value="german">آلمانی</option>
        <option value="arabic">عربی</option>
        <option value="turkish">ترکی</option>
      </select>

      <textarea
        className="form-control mb-3"
        rows="7"
        placeholder="متن را وارد کنید..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button className="btn btn-primary w-100 mb-4" onClick={translate}>
        ترجمه کن
      </button>

      {result && (
        <div className="p-3 border rounded-4 bg-white shadow-sm">
          {result}
        </div>
      )}
    </div>
  );
}

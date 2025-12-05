import { useState } from "react";
import { useLanguage } from "../../context/LanguageContext";

export default function Rewriter() {
  const { dict, lang } = useLanguage();
  const [text, setText] = useState("");
  const [result, setResult] = useState("");

  const run = () => {
    if (!text.trim()) return;
    setResult(dict.rewriter_sample_response);
  };

  return (
    <div className="container py-4" style={{ direction: lang === "fa" ? "rtl" : "ltr" }}>
      <h3 className="fw-bold mb-3">{dict.rewriter}</h3>

      <textarea
        className="form-control mb-3"
        placeholder={dict.rewriter_placeholder}
        rows={7}
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button className="btn btn-primary w-100 mb-4" onClick={run}>
        {dict.run}
      </button>

      {result && (
        <div className="p-3 bg-white border rounded-4 shadow-sm">
          {result}
        </div>
      )}
    </div>
  );
}

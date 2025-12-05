import { useState } from "react";
import { useLanguage } from "../../context/LanguageContext";

export default function CodingAssistant() {
  const { dict, lang } = useLanguage();
  const [code, setCode] = useState("");
  const [result, setResult] = useState("");

  const run = () => {
    if (!code.trim()) return;
    setResult(dict.code_sample_response);
  };

  return (
    <div className="container py-4" style={{ direction: lang === "fa" ? "rtl" : "ltr" }}>
      <h3 className="fw-bold mb-3">{dict.code_assistant}</h3>

      <textarea
        className="form-control mb-3"
        placeholder={dict.code_placeholder}
        rows={7}
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />

      <button className="btn btn-primary w-100 mb-3" onClick={run}>
        {dict.run}
      </button>

      {result && (
        <pre className="p-3 bg-black text-white rounded-4 shadow-sm" style={{ whiteSpace: "pre-wrap" }}>
          {result}
        </pre>
      )}
    </div>
  );
}

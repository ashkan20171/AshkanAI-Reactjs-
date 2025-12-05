import { useLanguage } from "../context/LanguageContext";

export default function ModelSelector({ model, setModel }) {
  const { dict, lang } = useLanguage();

  const models = [
    { id: "gpt4", name: "GPT-4 Turbo" },
    { id: "gpt35", name: "GPT-3.5 Turbo" },
    { id: "gemini", name: "Gemini Pro" },
    { id: "claude", name: "Claude 3" },
    { id: "llama", name: "Llama 2" }
  ];

  return (
    <div className="mb-3" style={{ direction: lang === "fa" ? "rtl" : "ltr" }}>
      <label className="form-label fw-bold">{dict.select_model}</label>
      <select
        className="form-select"
        value={model}
        onChange={(e) => setModel(e.target.value)}
      >
        {models.map((m) => (
          <option key={m.id} value={m.id}>
            {m.name}
          </option>
        ))}
      </select>
    </div>
  );
}

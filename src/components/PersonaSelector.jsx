import { useLanguage } from "../context/LanguageContext";
import { usePersona } from "../context/PersonaContext";

export default function PersonaSelector({ persona, setPersona }) {
  const { dict, lang } = useLanguage();
  const { personas } = usePersona(); // پرسوناهای ذخیره‌شده + پیش‌فرض

  return (
    <div className="mb-3" style={{ direction: lang === "fa" ? "rtl" : "ltr" }}>
      <label className="form-label fw-bold">{dict.select_persona}</label>

      <select
        className="form-select"
        value={persona}
        onChange={(e) => setPersona(e.target.value)}
      >
        {personas.map((p) => (
          <option key={p.id} value={p.id}>
            {p.name}
          </option>
        ))}
      </select>
    </div>
  );
}

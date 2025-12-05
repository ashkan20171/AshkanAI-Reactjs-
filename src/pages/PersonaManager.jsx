import { useState } from "react";
import { usePersona } from "../context/PersonaContext";
import { useLanguage } from "../context/LanguageContext";

export default function PersonaManager() {
  const { personas, addPersona, deletePersona } = usePersona();
  const { dict, lang } = useLanguage();

  const [form, setForm] = useState({
    id: "",
    name: "",
    tone: "",
    behavior: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.id || !form.name) return;

    addPersona(form);
    setForm({ id: "", name: "", tone: "", behavior: "" });
  };

  return (
    <div className="container py-4" style={{ direction: lang === "fa" ? "rtl" : "ltr" }}>
      <h3 className="fw-bold mb-4">{dict.persona_manager}</h3>

      <div className="row">
        
        {/* فرم ساخت پرسونا */}
        <div className="col-md-5">
          <div className="card p-4 rounded-4 shadow-sm">
            <h5 className="fw-bold">{dict.create_persona}</h5>

            <form onSubmit={handleSubmit}>
              <input
                className="form-control mb-2"
                placeholder={dict.persona_id}
                value={form.id}
                onChange={(e) => setForm({ ...form, id: e.target.value })}
              />

              <input
                className="form-control mb-2"
                placeholder={dict.persona_name}
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />

              <input
                className="form-control mb-2"
                placeholder={dict.persona_tone}
                value={form.tone}
                onChange={(e) => setForm({ ...form, tone: e.target.value })}
              />

              <textarea
                className="form-control mb-3"
                placeholder={dict.persona_behavior}
                value={form.behavior}
                onChange={(e) => setForm({ ...form, behavior: e.target.value })}
              />

              <button className="btn btn-primary w-100">{dict.save_persona}</button>
            </form>
          </div>
        </div>

        {/* لیست پرسوناها */}
        <div className="col-md-7">
          <div className="card p-4 rounded-4 shadow-sm">
            <h5 className="fw-bold mb-3">{dict.persona_list}</h5>

            {personas.map((p) => (
              <div key={p.id} className="border rounded-3 p-3 mb-2">
                <strong>{p.name}</strong> <br />
                <small className="text-muted">{p.tone}</small>
                <p className="mt-2">{p.behavior}</p>

                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => deletePersona(p.id)}
                >
                  {dict.delete}
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

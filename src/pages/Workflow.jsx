import { useState } from "react";
import { useLanguage } from "../context/LanguageContext";

export default function Workflow() {
  const { dict, lang } = useLanguage();
  const [steps, setSteps] = useState([]);

  const addStep = () => {
    const step = prompt(dict.add_step_prompt);
    if (!step) return;
    setSteps([...steps, step]);
  };

  return (
    <div className="container py-4" style={{ direction: lang === "fa" ? "rtl" : "ltr" }}>
      <h3 className="fw-bold mb-3">{dict.workflow_builder}</h3>

      <button className="btn btn-primary mb-3" onClick={addStep}>
        {dict.add_step}
      </button>

      <ul className="list-group">
        {steps.map((s, i) => (
          <li key={i} className="list-group-item">
            {i + 1}. {s}
          </li>
        ))}
      </ul>
    </div>
  );
}

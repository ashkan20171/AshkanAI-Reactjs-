import { useState } from "react";
import { useLanguage } from "../../context/LanguageContext";

export default function TaskAgent() {
  const { dict, lang } = useLanguage();
  const [task, setTask] = useState("");
  const [result, setResult] = useState("");

  const run = () => {
    if (!task.trim()) return;
    setResult(dict.agent_sample_response);
  };

  return (
    <div className="container py-4" style={{ direction: lang === "fa" ? "rtl" : "ltr" }}>
      <h3 className="fw-bold mb-3">{dict.task_agent}</h3>

      <textarea
        className="form-control mb-3"
        placeholder={dict.agent_placeholder}
        rows={6}
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />

      <button className="btn btn-primary w-100 mb-3" onClick={run}>
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

import { useState } from "react";
import { useLanguage } from "../../context/LanguageContext";
import { useAuth } from "../../context/AuthContext";

export default function TaskAgent() {
  const { dict, lang } = useLanguage();
  const { user } = useAuth(); // ← این باید باشد

  const [task, setTask] = useState("");
  const [result, setResult] = useState("");

  // محدودیت پلن
  if (!user.planDetails.allowTaskAgent) {
    return (
      <div className="container py-4" style={{ direction: lang === "fa" ? "rtl" : "ltr" }}>
        <div className="alert alert-warning">{dict.no_access_agent}</div>
        <a href="/upgrade" className="btn btn-primary">{dict.upgrade_plan}</a>
      </div>
    );
  }

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

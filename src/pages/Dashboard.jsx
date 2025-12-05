import { useLanguage } from "../context/LanguageContext";
import { useAuth } from "../context/AuthContext";
import { useMemory } from "../context/MemoryContext";
import { usePersona } from "../context/PersonaContext";

import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";

import { useEffect, useState } from "react";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

export default function Dashboard() {
  const { dict, lang } = useLanguage();
  const { user } = useAuth();
  const { memory } = useMemory();
  const { personas } = usePersona();

  const [usage, setUsage] = useState([]);

  // تعداد پیام‌ها از تمام چت‌ها
  useEffect(() => {
    const chats = JSON.parse(localStorage.getItem("ashkanai_chats")) || [];
    const count = chats.reduce((sum, c) => sum + c.messages.length, 0);
    setUsage(count);
  }, []);

  const limit = user?.planDetails?.maxMessages === Infinity
    ? dict.unlimited
    : user?.planDetails?.maxMessages;

  const percent =
    limit === dict.unlimited ? 0 : Math.min((usage / limit) * 100, 100);

  const data = {
    labels: ["Sat","Sun","Mon","Tue","Wed","Thu","Fri"],
    datasets: [
      {
        label: dict.weekly_usage,
        data: [5, 12, 18, 9, 22, 13, usage], 
        borderColor: "#007bff",
        backgroundColor: "rgba(0,123,255,0.3)",
        tension: 0.4,
      },
    ],
  };

  return (
    <div
      className="container py-4"
      style={{ direction: lang === "fa" ? "rtl" : "ltr" }}
    >
      <h2 className="fw-bold mb-4">{dict.dashboard}</h2>

      <div className="row g-4">

        {/* کارت اطلاعات حساب */}
        <div className="col-md-4">
          <div className="card p-4 rounded-4 shadow-sm">
            <h5 className="fw-bold mb-3">{dict.account_info}</h5>

            <p><strong>{dict.fullname}: </strong> {user?.name}</p>
            <p><strong>{dict.email}: </strong> {user?.email}</p>
            <p>
              <strong>{dict.active_plan}: </strong>
              <span className="badge bg-primary px-3">
                {user?.plan.toUpperCase()}
              </span>
            </p>

            {/* مصرف پلن */}
            <p className="mt-3 fw-bold">
              {dict.usage}: {usage} / {limit}
            </p>

            <div className="progress mb-3">
              <div
                className="progress-bar bg-success"
                style={{ width: `${percent}%` }}
              ></div>
            </div>

            {user?.plan !== "ultimate" && (
              <a href="/upgrade" className="btn btn-primary w-100">
                {dict.upgrade_plan}
              </a>
            )}
          </div>
        </div>

        {/* نمودار مصرف */}
        <div className="col-md-8">
          <div className="card p-4 rounded-4 shadow-sm">
            <h5 className="fw-bold">{dict.weekly_chart}</h5>
            <Line data={data} />
          </div>
        </div>

        {/* آخرین چت‌ها */}
        <div className="col-md-6">
          <div className="card p-4 rounded-4 shadow-sm">
            <h5 className="fw-bold">{dict.recent_chats}</h5>

            {JSON.parse(localStorage.getItem("ashkanai_chats"))?.slice(0, 5).map((chat) => (
              <div key={chat.id} className="p-2 border rounded-3 mb-2">
                <strong>{chat.title}</strong>
                <br />
                <small className="text-muted">
                  {new Date(chat.date).toLocaleString()}
                </small>
              </div>
            ))}
          </div>
        </div>

        {/* آخرین ابزارهای استفاده‌شده */}
        <div className="col-md-6">
          <div className="card p-4 rounded-4 shadow-sm">
            <h5 className="fw-bold">{dict.recent_tools}</h5>

            <ul className="list-group">
              <li className="list-group-item">📝 Summarizer</li>
              <li className="list-group-item">♻️ Rewriter</li>
              <li className="list-group-item">🌍 Translator</li>
              <li className="list-group-item">🎨 Image Generator</li>
              <li className="list-group-item">🤖 AI Agent</li>
            </ul>
          </div>
        </div>

        {/* اطلاعات حافظه AI */}
        <div className="col-md-6">
          <div className="card p-4 rounded-4 shadow-sm">
            <h5 className="fw-bold">{dict.ai_memory}</h5>

            {Object.keys(memory).length === 0 && (
              <p className="text-muted">{dict.no_memory}</p>
            )}

            {Object.entries(memory).map(([key, value]) => (
              <p key={key}><strong>{key}:</strong> {value}</p>
            ))}
          </div>
        </div>

        {/* پرسوناها */}
        <div className="col-md-6">
          <div className="card p-4 rounded-4 shadow-sm">
            <h5 className="fw-bold">{dict.personas}</h5>

            {personas.map((p) => (
              <div key={p.id} className="border rounded-3 p-2 mb-2">
                <strong>{p.name}</strong>
                <br />
                <small>{p.tone}</small>
              </div>
            ))}

            <a href="/personas" className="btn btn-outline-primary mt-3 w-100">
              {dict.manage_personas}
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}

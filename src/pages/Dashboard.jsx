import React from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const { user, logout } = useAuth();

  if (!user) return <div>در حال بارگذاری…</div>;

  const plan = user.planDetails;

  return (
    <div className="dashboard-pro">

      {/* کارت خوش آمد */}
      <div className="welcome-card glass">
        <h2>سلام، {user.name || "کاربر عزیز"} 👋</h2>
        <p>خوش آمدی به AshkanAI — هوش مصنوعی شخصی شما</p>
      </div>

      {/* کارت پلن */}
      <div className="plan-card glass">
        <h3>پلن فعلی شما: <span>{plan.name}</span></h3>

        <div className="plan-stats">
          <p>حداکثر پیام: 
            <b>{plan.maxMessages === Infinity ? "نامحدود" : plan.maxMessages}</b>
          </p>

          <p className="small">
            امکانات پلن:
          </p>

          <ul>
            <li>🧑‍💻 Code Generator — {plan.allowCodeAssistant ? "فعال ✔" : "غیرفعال ✖"}</li>
            <li>🎨 Image Generator — {plan.allowImageGen ? "فعال ✔" : "غیرفعال ✖"}</li>
            <li>🤖 Task Agent — {plan.allowTaskAgent ? "فعال ✔" : "غیرفعال ✖"}</li>
          </ul>

          {(user.plan === "guest" || user.plan === "free") && (
            <Link className="upgrade-big-btn" to="/plans">
              🚀 ارتقا به پلن‌های حرفه‌ای
            </Link>
          )}
        </div>
      </div>

      {/* کارت فعالیت‌ها */}
      <div className="activity-card glass">
        <h3>فعالیت اخیر</h3>
        <p>به زودی تاریخچه چت شما اینجا نمایش داده می‌شود…</p>
      </div>

      {/* دکمه خروج */}
      <button onClick={logout} className="logout-pro">
        خروج از حساب
      </button>
    </div>
  );
}

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";

export default function Sidebar() {
  const { user, logout } = useAuth();
  const { lang, changeLang } = useLanguage();

  const [open, setOpen] = useState(false);

  return (
    <>
      {/* دکمه موبایل */}
      <button className="sidebar-toggle" onClick={() => setOpen(true)}>
        ☰
      </button>

      {/* پس‌زمینه تاریک (برای موبایل) */}
      {open && <div className="sidebar-overlay" onClick={() => setOpen(false)}></div>}

      <div className={`sidebar glass ${open ? "open" : ""}`}>

        {/* هدر */}
        <div className="sidebar-header">
          <h3>AshkanAI</h3>
          <button className="close-btn" onClick={() => setOpen(false)}>×</button>
        </div>

        {/* دکمه چت جدید */}
        <Link to="/chat" className="new-chat-btn">➕ چت جدید</Link>

        {/* تاریخچه چت */}
        <div className="sidebar-section">
          <h4>تاریخچه</h4>
          <ul className="history-list">
            <li>گفتگو 1</li>
            <li>گفتگو 2</li>
            <li>گفتگو 3</li>
          </ul>
        </div>

        {/* اطلاعات کاربر */}
        <div className="sidebar-section">
          <h4>کاربر</h4>
          <p>{user?.name || "کاربر مهمان"}</p>
          <p className="plan-name">پلن: {user?.planDetails?.name}</p>
        </div>

        {/* تنظیمات */}
        <div className="sidebar-section">
          <h4>تنظیمات</h4>

          <button
            className="sidebar-btn"
            onClick={() => document.body.classList.toggle("dark")}
          >
            🌓 تغییر تم
          </button>

          <button
            className="sidebar-btn"
            onClick={() => changeLang(lang === "fa" ? "en" : "fa")}
          >
            🌐 زبان: {lang === "fa" ? "فارسی" : "English"}
          </button>

          <Link className="sidebar-btn" to="/plans">
            🚀 ارتقا پلن
          </Link>
<ul className="history-list">
  {history.map(h => (
    <li key={h.id}>{h.title}</li>
  ))}
</ul>

          <button className="sidebar-btn logout" onClick={logout}>
            خروج
          </button>
        </div>

      </div>
    </>
  );
}
import React from "react";
import { useAuth } from "../context/AuthContext";

export default function Sidebar({ onSelectChat, onNewChat }) {
  const { history, setHistory } = useAuth();

  const deleteChat = (id) => {
    const filtered = history.filter((h) => h.id !== id);
    setHistory(filtered);
    localStorage.setItem("chat_titles", JSON.stringify(filtered));
  };

  return (
    <div className="sidebar">

      <button className="new-chat-btn" onClick={onNewChat}>
        + چت جدید
      </button>

      <div className="history-list">
        {history.length === 0 && (
          <div className="empty-history">چتی وجود ندارد</div>
        )}

        {history.map((item) => (
          <div key={item.id} className="history-item">
            <div onClick={() => onSelectChat(item.id)}>{item.title}</div>
            <button className="delete-btn" onClick={() => deleteChat(item.id)}>🗑</button>
          </div>
        ))}
      </div>

    </div>
  );
}

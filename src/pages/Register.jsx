import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [info, setInfo] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    register(info);
    navigate("/dashboard");
  };

  return (
    <div className="auth-page full-center">
      <div className="auth-card glass">

        <h2 className="title">ایجاد حساب</h2>
        <p className="subtitle">به AshkanAI خوش آمدی 🤖✨</p>

        <form onSubmit={handleSubmit} className="auth-form">

          <div className="input-group">
            <span>👤</span>
            <input
              type="text"
              placeholder="نام شما"
              value={info.name}
              onChange={(e) => setInfo({ ...info, name: e.target.value })}
              required
            />
          </div>

          <div className="input-group">
            <span>📧</span>
            <input
              type="email"
              placeholder="ایمیل"
              value={info.email}
              onChange={(e) => setInfo({ ...info, email: e.target.value })}
              required
            />
          </div>

          <div className="input-group">
            <span>🔒</span>
            <input
              type="password"
              placeholder="رمز عبور"
              value={info.password}
              onChange={(e) => setInfo({ ...info, password: e.target.value })}
              required
            />
          </div>

          <button className="auth-btn" type="submit">
            ثبت‌نام
          </button>
        </form>

        <div className="auth-footer">
          قبلاً ثبت‌نام کردی؟ <Link to="/login">وارد شو</Link>
        </div>

      </div>
    </div>
  );
}

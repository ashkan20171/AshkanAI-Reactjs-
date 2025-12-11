import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const success = login(email, password);

    if (!success) {
      setError("ایمیل یا رمز عبور اشتباه است");
      return;
    }

    navigate("/dashboard");
  };

  return (
    <div className="auth-page full-center">
      <div className="auth-card glass">

        <h2 className="title">ورود به حساب</h2>
        <p className="subtitle">دوباره خوش آمدی 🌟</p>

        {error && <div className="auth-error">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">

          <div className="input-group">
            <span>📧</span>
            <input
              type="email"
              placeholder="ایمیل"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <span>🔒</span>
            <input
              type="password"
              placeholder="رمز عبور"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button className="auth-btn" type="submit">
            ورود
          </button>
        </form>

        <div className="auth-footer">
          حساب نداری؟ <Link to="/register">ثبت‌نام کن</Link>
        </div>

      </div>
    </div>
  );
}

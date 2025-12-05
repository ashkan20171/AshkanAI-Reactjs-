import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

export default function Settings() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const [name, setName] = useState(user?.name || "");
  const [password, setPassword] = useState(user?.password || "");

  const saveChanges = () => {
    const updated = { ...user, name, password };

    localStorage.setItem("ashkanai_user", JSON.stringify(updated));

    let users = JSON.parse(localStorage.getItem("ashkanai_users"));
    const idx = users.findIndex((u) => u.email === user.email);
    users[idx] = updated;

    localStorage.setItem("ashkanai_users", JSON.stringify(users));

    alert("تغییرات ذخیره شد ✔");
  };

  return (
    <div className="container mt-4" style={{ maxWidth: 700 }}>
      <h3 className="fw-bold mb-4">⚙️ تنظیمات حساب</h3>

      <div className="p-4 border rounded-4 bg-white shadow-sm">

        {/* Name */}
        <div className="mb-3">
          <label className="form-label">نام</label>
          <input
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* Password */}
        <div className="mb-3">
          <label className="form-label">رمز عبور</label>
          <input
            className="form-control"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* Theme */}
        <div className="mb-3">
          <label className="form-label">حالت نمایش</label>
          <button className="btn btn-secondary w-100" onClick={toggleTheme}>
            {theme === "dark" ? "☀ حالت روشن" : "🌙 حالت تاریک"}
          </button>
        </div>

        <button className="btn btn-primary w-100" onClick={saveChanges}>
          ذخیره تغییرات
        </button>
      </div>

      <button className="btn btn-danger w-100 mt-4" onClick={logout}>
        خروج از حساب
      </button>
    </div>
  );
}

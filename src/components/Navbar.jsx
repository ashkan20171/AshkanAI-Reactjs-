import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/logo/ashkanai-light.png";
import { useTheme } from "../context/ThemeContext";

export default function Navbar() {
    const { theme, toggleTheme } = useTheme();
    <button 
  className="btn btn-sm btn-outline-secondary me-2"
  onClick={toggleTheme}
>
  {theme === "dark" ? "☀️ روشن" : "🌙 تاریک"}
</button>
  const { user, logout } = useAuth();

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm px-3">
      <Link className="navbar-brand d-flex align-items-center" to="/">
        <img src={logo} alt="AshkanAI" height="40" className="me-2" />
        <span className="fw-bold fs-4">AshkanAI</span>
      </Link>

      <div className="ms-auto">
        {!user ? (
          <>
            <Link className="btn btn-outline-primary me-2" to="/login">
              ورود
            </Link>
            <Link className="btn btn-primary" to="/register">
              ثبت‌نام
            </Link>
          </>
        ) : (
          <>
            <Link className="btn btn-secondary me-2" to="/dashboard">
              داشبورد
            </Link>
            <button onClick={logout} className="btn btn-danger">
              خروج
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

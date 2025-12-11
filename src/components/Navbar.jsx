import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/logo/ashkanai-light.png";
import { useLanguage } from "../context/LanguageContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const { lang, changeLang, dict } = useLanguage();

  const isGuestOrFree = user && (user.plan === "guest" || user.plan === "free");

  return (
    <nav className="navbar navbar-expand-lg bg-light shadow-sm px-3 d-flex align-items-center">

      {/* لوگو */}
      <Link className="navbar-brand d-flex align-items-center" to="/dashboard">
        <img src={logo} alt="AshkanAI" height="40" className="me-2" />
        <strong>AshkanAI</strong>
      </Link>

      {/* دکمه تغییر تم */}
      <button
        className="btn btn-outline-dark ms-3"
        onClick={() => document.body.classList.toggle("dark")}
      >
        🌓
      </button>

      {/* تغییر زبان */}
      <button
        className="btn btn-outline-secondary ms-2"
        onClick={() => changeLang(lang === "en" ? "fa" : "en")}
      >
        {lang === "en" ? "FA" : "EN"}
      </button>

      {/* آیکون پر کردن فضا */}
      <div className="flex-grow-1"></div>

      {/* لینک‌های سمت راست */}
      <div className={`d-flex align-items-center ${lang === "fa" ? "flex-row-reverse" : ""}`}>

        {/* اگر لاگین نیست */}
        {!user && (
          <>
            <Link className="btn btn-outline-primary me-2" to="/login">
              {dict.login}
            </Link>
            <Link className="btn btn-primary" to="/register">
              {dict.signup}
            </Link>
          </>
        )}

        {/* اگر لاگین است */}
        {user && (
          <>
            {/* لینک داشبورد */}
            <Link className="btn btn-secondary me-2" to="/dashboard">
              {dict.dashboard}
            </Link>

            {/* دکمه ارتقا فقط برای guest و free */}
            {isGuestOrFree && (
              <Link className="btn btn-warning me-2" to="/plans">
                🚀 ارتقا
              </Link>
            )}

            {/* خروج */}
            <button className="btn btn-danger" onClick={logout}>
              {dict.logout}
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/logo/ashkanai-light.png";
import { useLanguage } from "../context/LanguageContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const { lang, changeLang, dict } = useLanguage();

  return (
    <nav className="navbar navbar-expand-lg bg-light shadow-sm px-3">
      <Link className="navbar-brand d-flex align-items-center" to="/">
        <img src={logo} alt="AshkanAI" height="40" className="me-2" />
        <strong>AshkanAI</strong>
      </Link>

      {/* Language Switcher */}
      <button
        className="btn btn-outline-secondary ms-3"
        onClick={() => changeLang(lang === "en" ? "fa" : "en")}
      >
        {lang === "en" ? "FA" : "EN"}
      </button>

      <div className={`ms-auto d-flex align-items-center ${lang === "fa" ? "flex-row-reverse" : ""}`}>
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

        {user && (
          <>
            <Link className="btn btn-secondary me-2" to="/dashboard">
              {dict.dashboard}
            </Link>

            <button className="btn btn-danger" onClick={logout}>
              {dict.logout}
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

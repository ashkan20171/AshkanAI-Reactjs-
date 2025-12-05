import { useLanguage } from "../context/LanguageContext";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";

export default function Settings() {
  const { lang, changeLang, dict } = useLanguage();
  const { theme, setTheme } = useTheme();
  const { user } = useAuth();

  return (
    <div className="container py-4" style={{ direction: lang === "fa" ? "rtl" : "ltr" }}>
      <h3 className="fw-bold mb-4">{dict.settings}</h3>

      {/* Language */}
      <div className="card p-4 rounded-4 shadow-sm mb-4" style={{ maxWidth: 500 }}>
        <h5>{dict.language}</h5>
        <select
          className="form-select mt-2"
          value={lang}
          onChange={(e) => changeLang(e.target.value)}
        >
          <option value="en">{dict.english}</option>
          <option value="fa">{dict.persian}</option>
        </select>
      </div>

      {/* Theme */}
      <div className="card p-4 rounded-4 shadow-sm mb-4" style={{ maxWidth: 500 }}>
        <h5>{dict.theme}</h5>
        <select
          className="form-select mt-2"
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
        >
          <option value="light">{dict.light}</option>
          <option value="dark">{dict.dark}</option>
          <option value="system">{dict.system}</option>
        </select>
      </div>

      {/* Plan */}
      <div className="card p-4 rounded-4 shadow-sm" style={{ maxWidth: 500 }}>
        <h5>{dict.subscription}</h5>
        <p className="mt-2">
          {dict.active_plan}:{" "}
          <span className="badge bg-primary px-3">
            {user?.plan.toUpperCase()}
          </span>
        </p>
        <a className="btn btn-outline-primary mt-3" href="/upgrade">
          {dict.upgrade_plan}
        </a>
      </div>
    </div>
  );
}

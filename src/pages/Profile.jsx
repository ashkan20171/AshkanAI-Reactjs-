import { useLanguage } from "../context/LanguageContext";
import { useAuth } from "../context/AuthContext";

export default function Profile() {
  const { dict, lang } = useLanguage();
  const { user } = useAuth();

  return (
    <div
      className="container py-4"
      style={{ direction: lang === "fa" ? "rtl" : "ltr" }}
    >
      <h3 className="fw-bold mb-4">{dict.profile}</h3>

      <div className="card p-4 rounded-4 shadow-sm" style={{ maxWidth: 500 }}>
        <h5 className="mb-3">{dict.account_info}</h5>

        <p>
          <strong>{dict.fullname}: </strong>
          {user?.name}
        </p>

        <p>
          <strong>{dict.email}: </strong>
          {user?.email}
        </p>

        <p>
          <strong>{dict.active_plan}: </strong>
          <span className="badge bg-primary">{user?.plan.toUpperCase()}</span>
        </p>

        <p className="text-muted small">{dict.profile_tip}</p>
      </div>
    </div>
  );
}

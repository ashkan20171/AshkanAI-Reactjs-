import { useAuth } from "../context/AuthContext";

export default function Sidebar() {
  const { user } = useAuth();

  if (!user || user.plan === "free") return null;

  return (
    <div className="p-3 border-end" style={{ width: 240 }}>
      <h5 className="fw-bold mb-3">گفت‌وگوهای من</h5>
      <button className="btn btn-outline-light w-100 mb-2">+ گفت‌وگوی جدید</button>

      <div className="text-muted small">این بخش در نسخه نهایی فعال می‌شود.</div>
    </div>
  );
}

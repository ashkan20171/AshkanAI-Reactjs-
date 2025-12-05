import { useAuth } from "../context/AuthContext";

export default function Plans() {
  const { user, register } = useAuth();

  const upgrade = (plan) => {
    const updated = { ...user, plan };
    localStorage.setItem("ashkanai_user", JSON.stringify(updated));

    const allUsers = JSON.parse(localStorage.getItem("ashkanai_users"));
    const idx = allUsers.findIndex((u) => u.email === user.email);
    allUsers[idx] = updated;
    localStorage.setItem("ashkanai_users", JSON.stringify(allUsers));
  };

  return (
    <div className="container mt-4">
      <h2 className="fw-bold mb-4 text-center">پلن‌های AshkanAI</h2>

      <div className="row g-4">
        
        <div className="col-md-4">
          <div className="p-4 border rounded-4 shadow-sm text-center">
            <h4>Free</h4>
            <p className="text-muted">مناسب شروع</p>
            <button className="btn btn-outline-primary w-100">
              فعال است
            </button>
          </div>
        </div>

        <div className="col-md-4">
          <div className="p-4 border rounded-4 shadow-sm text-center">
            <h4>Premium</h4>
            <p className="text-muted">چت سریع + امکانات ویژه</p>
            <button
              className="btn btn-primary w-100"
              onClick={() => upgrade("premium")}
            >
              ارتقا به Premium
            </button>
          </div>
        </div>

        <div className="col-md-4">
          <div className="p-4 border rounded-4 shadow-sm text-center">
            <h4>Ultra</h4>
            <p className="text-muted">کامل‌ترین امکانات + سرعت بالا</p>
            <button
              className="btn btn-dark w-100"
              onClick={() => upgrade("ultra")}
            >
              ارتقا به Ultra
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

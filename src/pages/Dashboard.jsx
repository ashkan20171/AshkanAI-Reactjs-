import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const { user } = useAuth();

  if (!user)
    return <h3 className="text-center mt-5">برای دیدن داشبورد وارد شوید</h3>;

  return (
    <div className="container mt-4">
      <h2 className="fw-bold">
        سلام {user.name} 👋  
      </h2>

      <p className="text-muted mb-4">پلن فعلی: {user.plan}</p>

      <div className="list-group">
        <Link to="/chat" className="list-group-item list-group-item-action">
          💬 چت با هوش مصنوعی
        </Link>

        <Link to="/plans" className="list-group-item list-group-item-action">
          ⭐ ارتقای پلن
        </Link>

        <Link to="/profile" className="list-group-item list-group-item-action">
          ⚙️ پروفایل
        </Link>
        
        <Link to="/files" className="list-group-item list-group-item-action">
       📁 مدیریت فایل‌ها
       </Link>
      </div>
    </div>
  );
}

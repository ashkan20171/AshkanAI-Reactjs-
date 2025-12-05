import { useAuth } from "../context/AuthContext";

export default function Profile() {
  const { user } = useAuth();

  if (!user)
    return <h3 className="text-center mt-5">ابتدا وارد شوید</h3>;

  return (
    <div className="container mt-4" style={{ maxWidth: 600 }}>
      <h2 className="fw-bold">پروفایل</h2>

      <div className="border rounded-4 p-4 mt-3 shadow-sm bg-white">
        <p><strong>نام:</strong> {user.name}</p>
        <p><strong>ایمیل:</strong> {user.email}</p>
        <p><strong>پلن:</strong> {user.plan}</p>
      </div>
    </div>
  );
}

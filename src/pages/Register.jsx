import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    plan: "free",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    register(form);
    navigate("/dashboard");
  };

  return (
    <div className="container mt-5" style={{ maxWidth: 450 }}>
      <h2 className="fw-bold mb-4 text-center">ثبت‌نام</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">نام</label>
          <input
            name="name"
            className="form-control"
            value={form.name}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">ایمیل</label>
          <input
            type="email"
            name="email"
            className="form-control"
            value={form.email}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">رمز عبور</label>
          <input
            type="password"
            name="password"
            className="form-control"
            value={form.password}
            onChange={handleChange}
          />
        </div>

        <button className="btn btn-success w-100">ثبت‌نام</button>
      </form>
    </div>
  );
}

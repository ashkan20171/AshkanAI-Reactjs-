import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";

export default function Register() {
  const { dict } = useLanguage();
  const { register } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = (e) => {
    e.preventDefault();
    register({ name, email, password, plan: "free" });
    navigate("/dashboard");
  };

  return (
    <div
      className="container d-flex justify-content-center align-items-center"
      style={{ minHeight: "80vh" }}
    >
      <div className="card shadow p-4 rounded-4" style={{ width: 420 }}>
        <h3 className="fw-bold mb-4 text-center">{dict.signup}</h3>

        <form onSubmit={submit}>
          <div className="mb-3">
            <label className="form-label">{dict.fullname}</label>
            <input
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">{dict.email}</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">{dict.password}</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button className="btn btn-primary w-100 py-2">{dict.signup}</button>

          <div className="text-center mt-3">
            <small>
              {dict.have_account}{" "}
              <Link to="/login">{dict.login}</Link>
            </small>
          </div>
        </form>
      </div>
    </div>
  );
}

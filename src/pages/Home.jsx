import { Link } from "react-router-dom";
import logo from "../assets/logo/ashkanai-light.png";
import { useLanguage } from "../context/LanguageContext";

export default function Home() {
  const { dict, lang } = useLanguage();

  return (
    <div className="container py-5 fade-in">

      <div className="text-center mb-5">
        <img 
          src={logo} 
          alt="AshkanAI" 
          style={{ width: 120, marginBottom: 20 }} 
          className="hero-logo"
        />

        <h1 className="display-4 fw-bold mb-3">
          {dict.welcome_title_1} {" "}
          <span className="text-primary">{dict.welcome_title_2}</span>
        </h1>

        <p className="lead text-muted mb-4" style={{ maxWidth: 700, margin: "0 auto" }}>
          {dict.description_line1}
          <br />
          {dict.description_line2}
        </p>

        <Link className="btn btn-primary btn-lg px-5 py-2 shadow rounded-pill" to="/dashboard">
          {dict.enter_dashboard}
        </Link>
      </div>

      <div className="text-center text-muted mt-5">
        © 2025 AshkanAI — {dict.rights_reserved}
      </div>

    </div>
  );
}

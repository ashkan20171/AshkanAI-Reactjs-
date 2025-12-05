import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";
import logo from "../assets/logo/ashkanai-light.png";

export default function Dashboard() {
  const { user } = useAuth();
  const { dict, lang } = useLanguage();

  return (
    <div className="container py-5">

      {/* Header: Welcome + User info */}
      <div className="text-center mb-5">
        <img src={logo} alt="AshkanAI" width={120} className="mb-3" />

        <h2 className="fw-bold">
          {dict.dashboard_welcome}{" "}
          <span className="text-primary">{user?.name}</span>
        </h2>

        <p className="text-muted">
          {dict.dashboard_subtitle}
        </p>

        <div className="badge bg-primary fs-6 py-2 px-3 mt-2">
          {dict.active_plan}: {user?.plan?.toUpperCase()}
        </div>
      </div>

      {/* Tools Section */}
      <h4 className="fw-bold mb-3">{dict.quick_tools}</h4>

      <div className="row g-4">

        <div className="col-md-4">
          <Link to="/chat" className="text-decoration-none">
            <div className="p-4 rounded-4 shadow-sm bg-white h-100">
              <h5>💬 {dict.ai_chat}</h5>
              <p className="text-muted">{dict.ai_chat_desc}</p>
            </div>
          </Link>
        </div>

        <div className="col-md-4">
          <Link to="/tools/summarizer" className="text-decoration-none">
            <div className="p-4 rounded-4 shadow-sm bg-white h-100">
              <h5>📝 {dict.summarizer}</h5>
              <p className="text-muted">{dict.summarizer_desc}</p>
            </div>
          </Link>
        </div>

        <div className="col-md-4">
          <Link to="/tools/rewriter" className="text-decoration-none">
            <div className="p-4 rounded-4 shadow-sm bg-white h-100">
              <h5>♻️ {dict.rewriter}</h5>
              <p className="text-muted">{dict.rewriter_desc}</p>
            </div>
          </Link>
        </div>

        <div className="col-md-4">
          <Link to="/tools/translator" className="text-decoration-none">
            <div className="p-4 rounded-4 shadow-sm bg-white h-100">
              <h5>🌍 {dict.translator}</h5>
              <p className="text-muted">{dict.translator_desc}</p>
            </div>
          </Link>
        </div>

        <div className="col-md-4">
          <Link to="/tools/image" className="text-decoration-none">
            <div className="p-4 rounded-4 shadow-sm bg-white h-100">
              <h5>🎨 {dict.image_gen}</h5>
              <p className="text-muted">{dict.image_gen_desc}</p>
            </div>
          </Link>
        </div>

        <div className="col-md-4">
          <Link to="/tools/code" className="text-decoration-none">
            <div className="p-4 rounded-4 shadow-sm bg-white h-100">
              <h5>💻 {dict.code_assistant}</h5>
              <p className="text-muted">{dict.code_assistant_desc}</p>
            </div>
          </Link>
        </div>

      </div>
    </div>
  );
}

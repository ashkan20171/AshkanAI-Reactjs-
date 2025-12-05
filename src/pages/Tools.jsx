import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";

export default function Tools() {
  const { dict, lang } = useLanguage();

  return (
    <div className="container py-4" style={{ direction: lang === "fa" ? "rtl" : "ltr" }}>
      <h2 className="fw-bold mb-4 text-center">{dict.tools_page_title}</h2>

      <div className="row g-4">

        {/* Summarizer */}
        <div className="col-md-4">
          <Link to="/tools/summarizer" className="text-decoration-none">
            <div className="p-4 bg-white border rounded-4 shadow-sm h-100">
              <h4>📝 {dict.summarizer}</h4>
              <p className="text-muted">{dict.summarizer_desc}</p>
            </div>
          </Link>
        </div>

        {/* Rewriter */}
        <div className="col-md-4">
          <Link to="/tools/rewriter" className="text-decoration-none">
            <div className="p-4 bg-white border rounded-4 shadow-sm h-100">
              <h4>♻️ {dict.rewriter}</h4>
              <p className="text-muted">{dict.rewriter_desc}</p>
            </div>
          </Link>
        </div>

        {/* Translator */}
        <div className="col-md-4">
          <Link to="/tools/translator" className="text-decoration-none">
            <div className="p-4 bg-white border rounded-4 shadow-sm h-100">
              <h4>🌍 {dict.translator}</h4>
              <p className="text-muted">{dict.translator_desc}</p>
            </div>
          </Link>
        </div>

        {/* Image Generator */}
        <div className="col-md-4">
          <Link to="/tools/image" className="text-decoration-none">
            <div className="p-4 bg-white border rounded-4 shadow-sm h-100">
              <h4>🎨 {dict.image_gen}</h4>
              <p className="text-muted">{dict.image_gen_desc}</p>
            </div>
          </Link>
        </div>

        {/* Code Assistant */}
        <div className="col-md-4">
          <Link to="/tools/code" className="text-decoration-none">
            <div className="p-4 bg-white border rounded-4 shadow-sm h-100">
              <h4>💻 {dict.code_assistant}</h4>
              <p className="text-muted">{dict.code_assistant_desc}</p>
            </div>
          </Link>
        </div>

        {/* Task Agent */}
        <div className="col-md-4">
          <Link to="/tools/agent" className="text-decoration-none">
            <div className="p-4 bg-white border rounded-4 shadow-sm h-100">
              <h4>🤖 {dict.task_agent}</h4>
              <p className="text-muted">{dict.task_agent_desc}</p>
            </div>
          </Link>
        </div>

      </div>
    </div>
  );
}

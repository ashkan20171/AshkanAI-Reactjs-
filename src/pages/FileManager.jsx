import { useState } from "react";
import { useLanguage } from "../context/LanguageContext";

export default function FileManager() {
  const { dict, lang } = useLanguage();
  const [files, setFiles] = useState([]);

  const upload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFiles((prev) => [...prev, file.name]);
  };

  return (
    <div className="container py-4" style={{ direction: lang === "fa" ? "rtl" : "ltr" }}>
      <h3 className="fw-bold mb-3">{dict.files_manager}</h3>

      <input type="file" className="form-control mb-3" onChange={upload} />

      <div className="list-group">
        {files.length === 0 && (
          <div className="text-muted">{dict.no_files}</div>
        )}

        {files.map((f, i) => (
          <div key={i} className="list-group-item">
            📄 {f}
          </div>
        ))}
      </div>
    </div>
  );
}

import { useParams } from "react-router-dom";
import { useProject } from "../context/ProjectContext";
import { useLanguage } from "../context/LanguageContext";
import { useState } from "react";

export default function ProjectWorkspace() {
  const { id } = useParams();
  const { projects, updateProject } = useProject();
  const { dict, lang } = useLanguage();

  const project = projects.find((p) => p.id === id);

  const [note, setNote] = useState(project?.notes || "");

  const saveNote = () => {
    updateProject(id, { notes: note });
  };

  if (!project) return <h3>{dict.project_not_found}</h3>;

  return (
    <div className="container py-4" style={{ direction: lang === "fa" ? "rtl" : "ltr" }}>
      
      <h2 className="fw-bold mb-3">{project.title}</h2>
      <p className="text-muted">{project.description}</p>

      {/* 🔹 چت پروژه */}
      <a href={`/project/${id}/chat`} className="btn btn-primary mb-3">
        {dict.project_chat}
      </a>

      {/* 🔹 فایل‌ها */}
      <a href={`/project/${id}/files`} className="btn btn-outline-primary mb-3 ms-2">
        {dict.project_files}
      </a>

      <div className="card p-3 rounded-4 shadow-sm mt-3">
        <h5 className="fw-bold mb-2">{dict.project_notes}</h5>

        <textarea
          className="form-control"
          rows={10}
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />

        <button className="btn btn-success mt-3" onClick={saveNote}>
          {dict.save_note}
        </button>
      </div>

    </div>
  );
}

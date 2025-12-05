import { useState } from "react";
import { useProject } from "../context/ProjectContext";
import { useLanguage } from "../context/LanguageContext";

export default function Projects() {
  const { projects, createProject, deleteProject } = useProject();
  const { dict, lang } = useLanguage();

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  const addProject = () => {
    if (!title.trim()) return;

    createProject({
      id: Date.now().toString(),
      title,
      description: desc,
      date: Date.now(),
      chat: [],
      files: [],
      notes: "",
      persona: "assistant",
    });

    setTitle("");
    setDesc("");
  };

  return (
    <div className="container py-4" style={{ direction: lang === "fa" ? "rtl" : "ltr" }}>
      
      <h2 className="fw-bold mb-4">{dict.projects}</h2>

      <div className="card p-4 rounded-4 shadow-sm mb-4">
        <h5>{dict.create_project}</h5>

        <input
          className="form-control mb-2"
          placeholder={dict.project_title}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className="form-control mb-2"
          placeholder={dict.project_desc}
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />

        <button className="btn btn-primary" onClick={addProject}>
          {dict.save_project}
        </button>
      </div>

      {/* لیست پروژه‌ها */}
      <div className="row g-3">
        {projects.map((p) => (
          <div className="col-md-4" key={p.id}>
            <div className="card p-3 rounded-4 shadow-sm">

              <h5>{p.title}</h5>
              <p className="text-muted">{p.description}</p>

              <small className="text-muted">
                {new Date(p.date).toLocaleString()}
              </small>

              <div className="d-flex justify-content-between mt-3">
                <a href={`/project/${p.id}`} className="btn btn-primary btn-sm">
                  {dict.open_project}
                </a>

                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => deleteProject(p.id)}
                >
                  {dict.delete}
                </button>
              </div>

            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
